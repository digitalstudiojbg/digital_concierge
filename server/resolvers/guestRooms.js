import db from '../models';
import { checkUserLogin } from '../utils/constant';
import {UserInputError} from 'apollo-server-express';

const _calcTotalNights = (checkInDate, checkOutDate) => {
    const diff = checkOutDate.getTime() - checkInDate.getTime();
    return Math.round(Math.abs(diff/(1000*60*60*24)));
};

export default {
    Query: {
        guestRooms: async (_root, _input) => {
            return await db.guests_rooms.findAll();
        },
        guestRoomsByRoomId: async (_root, { roomId }) => {
            return await db.guests_rooms.findAll({where: { roomId }});
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
                    pin
                }
            },
            { user, clientIp }
        ) => {
            await checkUserLogin(user);

            const checkInDate = new Date(checkin_date);
            const checkOutDate = new Date(checkout_date);

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
                total_nights: _calcTotalNights(checkInDate, checkOutDate),
                guest_count
            };

            const createdGuestRoom = db.guests_rooms.build(creatingProps);

            try {
                await createdGuestRoom.save();
            } catch (error) {console.log(error);
                throw new UserInputError(
                    `Create GuestRoom status failed.\nError Message: ${
                        error.message
                        }`
                );
            }

            return createdGuestRoom;
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
                    `Unable to delete room ${ roomId } for guest ${ guestId }.\nError Message: ${
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
