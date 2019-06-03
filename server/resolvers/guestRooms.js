import db from '../models';
import { checkUserLogin } from '../utils/constant';
import { UserInputError } from 'apollo-server-express';
import { identity, pickBy } from "lodash";

const _calcDiffInDays = (checkInDate, checkOutDate) => {
    const diff = checkOutDate.getTime() - checkInDate.getTime();
    return Math.round(diff/(1000*60*60*24));
};

export default {
    Query: {
        guestRooms: async (_root, _input) => {
            return await db.guests_rooms.findAll();
        },
        guestRoomsByRoomId: async (_root, { roomId }) => {
            return await db.guests_rooms.findAll({where: { roomId }});
        },
        guestRoomsByGuestId: async (_root, { guestId }) => {
            return await db.guests_rooms.findAll({
                where: {guestId},
                order: [['updatedAt', 'DESC']]
            })
        }
    },
    Mutation: {
        createGuestRoom: async (
            _root,
            {
                input: {
                    checkin_date,
                    checkout_date,
                    guest_count,
                    roomId,
                    guestId,
                    pin,
                    active
                }
            },
            { user }
        ) => {
            await checkUserLogin(user);

            const checkInDate = new Date(checkin_date);
            const checkOutDate = new Date(checkout_date);

            const totalNights = _calcDiffInDays(checkInDate, checkOutDate);

            if (totalNights < 1) {
                throw new UserInputError('Dates are incorrect');
            }

            const bookedRooms = await db.guests_rooms.count({where: {
                roomId,
                $or: [
                    {checkin_date: {$lte: checkInDate}, checkout_date: {$gte: checkOutDate}},
                    {checkin_date: {$lt: checkOutDate}, checkout_date: {$gte: checkOutDate}},
                    {checkin_date: {$lt: checkInDate}, checkout_date: {$gt: checkInDate}}
                ]
            }});

            if (bookedRooms > 0) {
                throw new UserInputError('There are other bookings for these dates');
            }

            const creatingProps = {
                guestId,
                roomId,
                pin,
                checkout_date: checkOutDate,
                checkin_date: checkInDate,
                total_nights: totalNights,
                guest_count,
                active
            };

            const createdGuestRoom = db.guests_rooms.build(creatingProps);

            try {
                await createdGuestRoom.save();
            } catch (error) {
                throw new UserInputError(
                    `Create GuestRoom status failed.\nError Message: ${
                        error.message
                        }`
                );
            }

            return createdGuestRoom;
        },
        updateGuestRoom: async (
            _root,
            {
                input: {
                    roomId,
                    guestId,
                    checkout_date,
                    guest_count,
                    pin,
                    active,
                    is_sending_survey
                }
            },
            { user }
        ) => {
            await checkUserLogin(user);

            let updatedGuestRoom = await db.guests_rooms.findOne({where: { roomId, guestId }});

            if (!updatedGuestRoom) {
                throw new UserInputError('The guest room does not exist')
            }

            const updatingProps = pickBy({
                guest_count,
                pin,
                active,
                is_sending_survey
            }, identity);

            if (checkout_date) {
                const checkOutDate = new Date(checkout_date);
                const checkInDate = updatedGuestRoom.checkin_date;
                const daysFromTodayToCheckout = _calcDiffInDays(new Date(), updatedGuestRoom.checkout_date);

                if (daysFromTodayToCheckout < 1) {
                    throw new UserInputError('Check Out date has already been expired')
                }

                const bookedRooms = await db.guests_rooms.count({where: {
                    roomId,
                    guestId: {$not: guestId },
                    $or: [
                        {checkin_date: {$lte: checkInDate}, checkout_date: {$gte: checkOutDate}},
                        {checkin_date: {$lt: checkOutDate}, checkout_date: {$gte: checkOutDate}},
                        {checkin_date: {$lt: checkInDate}, checkout_date: {$gt: checkInDate}}
                    ]
                }});

                if (bookedRooms > 0) {
                    throw new UserInputError('There are other bookings for these dates');
                }

                updatingProps.total_nights = _calcDiffInDays(updatedGuestRoom.checkin_date, checkOutDate);
                updatingProps.checkout_date = checkOutDate;
            }

            try {
                updatedGuestRoom = await updatedGuestRoom.update(updatingProps);
            } catch (error) {
                throw new UserInputError(
                    `Update GuestRoom status failed.\nError Message: ${
                        error.message
                        }`
                );
            }

            return updatedGuestRoom;

        },
        deleteGuestRoom: async (
            _root,
            {
                input: {
                    roomId,
                    guestId
                }
            },
            { user }
        ) => {
            await checkUserLogin(user);

            const deletedGuestRoom = await db.guests_rooms.findOne({where: { roomId, guestId }});

            if (!deletedGuestRoom) {
                throw new UserInputError('The guest room has already been deleted')
            }

            try {
                await deletedGuestRoom.destroy();
            } catch (error) {
                throw new UserInputError(
                    `Delete GuestRoom status failed.\nError Message: ${
                        error.message
                        }`
                );
            }

            return deletedGuestRoom;
        }
    },
    GuestRooms: {
        guest: async guestsRoom => {
            return await db.guest.findByPk(guestsRoom.guestId);
        },
        room: async guestsRoom => {
            return await db.room.findByPk(guestsRoom.roomId);
        }
    }
};
