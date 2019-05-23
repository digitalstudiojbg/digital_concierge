import db from '../models';
import { pickBy, identity } from 'lodash';
import {
    checkUserLogin,
    handleCreateActionActivityLog,
    handleUpdateActionActivityLog
} from '../utils/constant';
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

            await handleCreateActionActivityLog(
                createdGuestRoom,
                creatingProps,
                user,
                clientIp
            );

            return createdGuestRoom;
        },
        // updateGuestRoom: async (
        //     _root,
        //     {
        //         input: {
        //             checkin_date,
        //             checkout_date,
        //             guest_count,
        //             roomId,
        //             pin
        //         }
        //     },
        //     { user, clientIp }
        // ) => {
        //     await checkUserLogin(user);
        //
        //     let updatedGuestRoom = await db.guest.findByPk(id);
        //
        //     if (!updatedGuest) {
        //         throw new UserInputError('The guest does not exist')
        //     }
        //
        //     const checkInDate = new Date(checkin_date);
        //     const checkOutDate = new Date(checkout_date);
        //     const updatingProps = pickBy({
        //         roomId,
        //         pin,
        //         checkout_date: checkOutDate,
        //         checkin_date: checkInDate,
        //         total_nights: _calcTotalNights(checkInDate, checkOutDate),
        //         guest_count
        //     }, identity);
        //
        //     const createdGuestRoom = db.guests_rooms.build(creatingProps);
        //
        //     try {
        //         await createdGuestRoom.save();
        //     } catch (error) {console.log(error);
        //         throw new UserInputError(
        //             `Create GuestRoom status failed.\nError Message: ${
        //                 error.message
        //                 }`
        //         );
        //     }
        //
        //     await handleCreateActionActivityLog(
        //         createdGuestRoom,
        //         creatingProps,
        //         user,
        //         clientIp
        //     );
        //
        //     return createdGuestRoom;
        // },
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
