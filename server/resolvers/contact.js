import db from "../models";
import {
    handleCreateActionActivityLog,
    handleUpdateActionActivityLog,
    handleDeleteActionActivityLog,
    asyncForEach
} from "../utils/constant";

export default {
    Query: {
        contact: async (_root, { id }) => await db.contact.findByPk(id),
        contacts: async () => await db.contact.findAll(),
        contactsByUser: async (_root, _input, { user }) =>
            await db.contact.findAll({ where: { clientId: user.clientId } })
    },
    Mutation: {
        createContact: async (
            _root,
            { input: { name, title, phone, mobile, email, clientId } },
            { user, clientIp }
        ) => {
            let create_contact = db.contact.build({
                name,
                title,
                phone,
                mobile,
                email,
                clientId
            });

            await create_contact.save();

            return create_contact;
        },
        createUpdateDeleteContact: async (
            _root,
            {
                input: {
                    clientId,
                    createContacts = [],
                    updateContacts = [],
                    deleteContacts = []
                }
            },
            { user, clientIp }
        ) => {
            if (createContacts.length > 0) {
                //Create contacts here
                await asyncForEach(
                    createContacts,
                    async ({ name, title, phone, mobile, email }) => {
                        let create_contact = db.contact.build({
                            name,
                            title,
                            phone,
                            mobile,
                            email,
                            clientId
                        });

                        try {
                            await create_contact.save();
                        } catch (error) {
                            throw new UserInputError(
                                `Contact name ${name} was not created.\nError Message: ${
                                    error.message
                                }`
                            );
                        }

                        handleCreateActionActivityLog(
                            create_contact,
                            { name, title, phone, mobile, email, clientId },
                            user,
                            clientIp
                        );
                    }
                );
            }
            if (updateContacts.length > 0) {
                //Update contacts here
                await asyncForEach(
                    updateContacts,
                    async ({ id, name, title, phone, mobile, email }) => {
                        const contact = await db.contact.findByPk(id);
                        if (!contact) {
                            throw new UserInputError(
                                `Contact ID ${id} was not found.`
                            );
                        }
                        try {
                            await contact.update({
                                name,
                                title,
                                phone,
                                mobile,
                                email
                            });
                        } catch (error) {
                            throw new UserInputError(
                                `Contact ID ${id} was not updated.\nError Message: ${
                                    error.message
                                }`
                            );
                        }

                        handleUpdateActionActivityLog(
                            contact,
                            {},
                            user,
                            clientIp
                        );
                    }
                );
            }
            if (deleteContacts.length > 0) {
                let deletedObjects = [];
                await asyncForEach(deleteContacts, async each => {
                    const contact = await db.contact.findByPk(each);
                    if (!contact) {
                        throw new UserInputError(
                            `Contact ID ${each} was not found.`
                        );
                    }
                    try {
                        await db.contact.destroy({ where: { id: each } });
                    } catch (error) {
                        throw new UserInputError(
                            `Contact ID ${each} was not deleted.\nError Message: ${
                                error.message
                            }`
                        );
                    }

                    deletedObjects.push(contact);
                });

                deletedObjects.forEach(object => {
                    handleDeleteActionActivityLog(object, {}, user, clientIp);
                });
            }
            return await db.contact.findAll({ where: { clientId } });
        }
    },
    Contact: {
        client: async contact => await db.client.findByPk(contact.clientId),
        advertiser: async contact =>
            await db.advertiser.findByPk(contact.advertiserId)
    }
};
