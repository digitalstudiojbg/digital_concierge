import db from '../models';
import _ from 'lodash';
import {
    checkUserLogin,
    handleCreateActionActivityLog,
    handleDeleteActionActivityLog,
    handleUpdateActionActivityLog
} from '../utils/constant';
import {UserInputError} from 'apollo-server-express';

export default {
    Query: {
        guest: async (_root, { id }) => {
            return await db.guest.findByPk(id);
        },
        guests: async (_root, _input, { user }) => {
            return await db.guest.findAll();
        }
    },
    Mutation: {
        createGuest: async (
            _root,
            {
                input: {
                    firstname,
                    lastname,
                    email,
                    phone1,
                    phone2,
                    clientId
                }
            },
            { user, clientIp }
        ) => {
            await checkUserLogin(user);

            const existingGuest = await db.guest.findOne({where: { email }});

            if (existingGuest) {
                throw new UserInputError(`The guest with email ${email} is already exist`)
            }

            const creatingProps = _.pickBy({firstname, lastname, email, phone1, phone2, clientId}, _.identity);
            const createdGuest = db.guest.build(creatingProps);

            try {
                await createdGuest.save();
            } catch (error) {
                throw new UserInputError(
                    `Create Guest ${email} status failed.\nError Message: ${
                        error.message
                    }`
                );
            }

            await handleCreateActionActivityLog(
                createdGuest,
                creatingProps,
                user,
                clientIp
            );

            return createdGuest;
        },
        updateGuest: async (
            __root,
            {
                input: {
                    id,
                    firstname,
                    lastname,
                    email,
                    phone1,
                    phone2
                }
            },
            { user, clientIp}
        ) => {
            const updatingProps = _.pickBy({ firstname, lastname, email, phone1, phone2 }, _.identity);

            await checkUserLogin(user);

            let updatedGuest = await db.guest.findByPk(id);

            if (!updatedGuest) {
                throw new UserInputError('The guest is not exist')
            }

            try {
                updatedGuest = await updatedGuest.update(updatingProps);
            } catch (error) {
                throw new UserInputError(
                    `Unable to update Guest ${id}.\nError Message: ${
                        error.message
                    }`
                );
            }

            await handleUpdateActionActivityLog(
                updatedGuest,
                updatingProps,
                user,
                clientIp
            );

            return updatedGuest;
        },
        deleteGuest: async (_root, { input: { id } }, { user, clientIp}) => {
            await checkUserLogin(user);
            const deletedGuest = await db.guest.findByPk(id);

            if (!deletedGuest) {
                throw new UserInputError('The guest is already deleted')
            }

            const logDeleteRecord = await handleDeleteActionActivityLog(
                deletedGuest,
                { id },
                user,
                clientIp
            );

            try {
                await db.guest.destroy({ where: { id }})
            } catch (error) {
                await db.activity_log.destroy({ where: { id: logDeleteRecord.id }});
                throw new UserInputError(
                    `Unable to delete Guest ${id}.\nError Message: ${
                        error.message
                    }`
                );
            }

            return id;
        }
    },
    Guest: {
        client: async guest => {
            return await db.client.findByPk(guest.clientId);
        },
        rooms: async guest => {
            return await db.room.findAll({
                include: [
                    {
                        model: db.guest,
                        where: { id: guest.id }
                    }
                ]
            });
        }
    }
};
