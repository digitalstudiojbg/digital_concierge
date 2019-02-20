import db from "../models";
import {
    processUpload,
    asyncForEach,
    processUploadMedia,
    checkUserLogin,
    processDeleteMedia,
    handleCreateActionActivityLog,
    handleUpdateActionActivityLog
} from "../utils/constant";
import { UserInputError } from "apollo-server-express";

export default {
    Query: {
        client: async (_root, { id }) => {
            return await db.client.findByPk(id);
        },
        clients: async (_root, _input, { user }) => {
            return await db.client.findAll();
        },
        clientByUser: async (_root, _input, { user }) =>
            await db.client.findByPk(user.clientId)
    },
    Mutation: {
        async uploadFilesWithClientId(parent, { files, clientId }, { user }) {
            checkUserLogin(user);
            try {
                return await new Promise(async (resolve, reject) => {
                    let output = [];
                    asyncForEach(files, async file => {
                        try {
                            output.push(
                                await processUploadMedia(
                                    file,
                                    clientId,
                                    "image"
                                )
                            );
                            output.length === files.length && resolve(output);
                        } catch (err) {
                            reject(err);
                        }
                    });
                }).then(data => {
                    return data;
                });
            } catch (e) {
                throw new UserInputError(e);
            }
        },

        async deleteFiles(parent, { media }, { user }) {
            checkUserLogin(user);
            console.log(media);

            try {
                return await new Promise(async (resolve, reject) => {
                    let output = [];
                    asyncForEach(media, async each => {
                        try {
                            output.push(
                                await processDeleteMedia(each.key, each.id)
                            );
                            output.length === media.length && resolve(output);
                        } catch (err) {
                            reject(err);
                        }
                    });
                }).then(data => {
                    return data && { result: true };
                });
            } catch (e) {
                throw new UserInputError(e);
            }

            console.log(data);
            return { result: true };
        },

        createClient: async (
            _root,
            {
                input: {
                    name,
                    full_company_name = "",
                    nature_of_business,
                    venue_address,
                    venue_city,
                    venue_zip_code,
                    venue_state_id,
                    postal_address,
                    postal_city,
                    postal_zip_code,
                    postal_state_id,
                    phone,
                    email,
                    number_of_users,
                    file
                }
            },
            { user, clientIp }
        ) => {
            /**
             * Dummy avatar link
             */
            // const avatar =
            //     "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/Holiday_Inn_Logo.png";
            // const venue_state = await db.state.findByPk(venue_state_id);
            // const postal_state = await db.state.findByPk(postal_state_id);
            // let create_client = db.client.build({
            //     name: full_company_name,
            //     full_company_name,
            //     nature_of_business,
            //     venue_address,
            //     venue_city,
            //     venue_zip_code,
            //     postal_address,
            //     postal_city,
            //     postal_zip_code,
            //     phone,
            //     email,
            //     number_of_users,
            //     avatar,
            //     venueStateId: venue_state.id,
            //     postalStateId: postal_state.id
            // });
            // await create_client.save();
            // return create_client;

            return new Promise((resolve, reject) => {
                processUpload(file).then(async data => {
                    let create_client = db.client.build({
                        name,
                        full_company_name,
                        nature_of_business,
                        venue_address,
                        venue_city,
                        venue_zip_code,
                        postal_address,
                        postal_city,
                        postal_zip_code,
                        phone,
                        email,
                        number_of_users,
                        avatar: data.location,
                        venueStateId: venue_state_id,
                        postalStateId: postal_state_id
                    });

                    await create_client.save();

                    handleCreateActionActivityLog(
                        create_client,
                        {
                            name,
                            full_company_name,
                            nature_of_business,
                            venue_address,
                            venue_city,
                            venue_zip_code,
                            postal_address,
                            postal_city,
                            postal_zip_code,
                            phone,
                            email,
                            number_of_users,
                            avatar: data.location,
                            venueStateId: venue_state_id,
                            postalStateId: postal_state_id
                        },
                        user,
                        clientIp
                    );

                    /**
                     * add department relationships here
                     */
                    const departments = await db.department.findAll({
                        where: {
                            is_standard_department: true
                        }
                    });

                    try {
                        await create_client.addDepartments(departments);
                    } catch (error) {
                        throw new UserInputError(
                            `Unable to assign standard departments to role.\nError Message: ${
                                error.message
                            }`
                        );
                    }

                    resolve(await db.client.findByPk(create_client.id));
                });
            });
        },
        updateClient: async (
            _root,
            {
                input: {
                    id,
                    name,
                    full_company_name = "",
                    nature_of_business,
                    venue_address,
                    venue_city,
                    venue_zip_code,
                    venue_state_id,
                    postal_address,
                    postal_city,
                    postal_zip_code,
                    postal_state_id,
                    phone,
                    email
                }
            },
            { user, clientIp }
        ) => {
            const client = await db.client.findByPk(id);
            try {
                await client.update({
                    name,
                    full_company_name,
                    nature_of_business,
                    venue_address,
                    venue_city,
                    venue_zip_code,
                    postal_address,
                    postal_city,
                    postal_zip_code,
                    phone,
                    email,
                    venueStateId: venue_state_id,
                    postalStateId: postal_state_id
                });
            } catch (error) {
                throw new UserInputError(
                    `Unable to update Client ${id}.\nError Message: ${
                        error.message
                    }`
                );
            }

            //Console logging changes
            handleUpdateActionActivityLog(client, {}, user, clientIp);

            return await db.client.findByPk(id);
        }
    },
    Client: {
        users: async client =>
            await db.user.findAll({ where: { clientId: client.id } }),
        departments: async client =>
            await db.department.findAll({
                include: [
                    {
                        model: db.client,
                        where: { id: client.id }
                    }
                ]
            }),
        guests: async client =>
            await db.guest.findAll({ where: { clientId: client.id } }),
        rooms: async client =>
            await db.room.findAll({ where: { clientId: client.id } }),
        systems: async client =>
            await db.system.findAll({ where: { clientId: client.id } }),
        media: async client =>
            await db.media.findAll({ where: { clientId: client.id } }),
        devices: async client =>
            await db.device.findAll({ where: { clientId: client.id } }),
        contacts: async client =>
            await db.contact.findAll({ where: { clientId: client.id } }),
        active_contract: async client => {
            const contracts = await db.contract.findAll({
                where: { clientId: client.id, active: true },
                order: [["createdAt", "DESC"]]
            });
            return contracts.length > 0 ? contracts[0] : null;
        },
        contracts: async client =>
            await db.contract.findAll({ where: { clientId: client.id } }),
        venue_state: async client =>
            await db.state.findByPk(client.venueStateId),
        postal_state: async client =>
            await db.state.findByPk(client.postalStateId),
        payments: async client =>
            await db.payment.findAll({ where: { clientId: client.id } }),
        licenses: async client =>
            await db.license.findAll({
                where: { clientId: client.id },
                order: [["expire_date", "DESC"]]
            }),
        activeLicense: async client =>
            await db.license.findAll({
                where: { clientId: client.id, active: true },
                limit: 1,
                order: [["createdAt", "DESC"]]
            }),
        key_user: async client => {
            const users = await db.user.findAll({
                where: { clientId: client.id },
                limit: 1,
                order: [["createdAt", "ASC"]]
            });
            return Boolean(users) && Array.isArray(users) && users.length === 1
                ? users[0]
                : null;
        }
    }
};
