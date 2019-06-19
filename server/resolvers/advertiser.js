import db from "../models";
import { UserInputError } from "apollo-server-express";
import {
    handleCreateActionActivityLog,
    handleUpdateActionActivityLog
} from "../utils/constant";

export default {
    Query: {
        advertiser: async (_root, { id }) => await db.advertiser.findByPk(id),
        advertisers: async (_root, _input, { user }) =>
            await db.advertiser.findAll(),
        advertisersByPublication: async (_root, { id }) =>
            await db.advertiser.findAll({
                where: { justBrilliantGuideId: id }
            }),
        advertiserCurrencyList: async (_root, { id }) => {
            const advertiser = await db.advertiser.findByPk(id);
            if (!Boolean(advertiser)) {
                return [];
            } else {
                const { stateId } = advertiser;
                const state = await db.state.findByPk(stateId);
                if (!Boolean(state)) {
                    return [];
                } else {
                    const { countryId } = state;
                    const country = await db.country.findByPk(countryId);
                    if (!Boolean(country)) {
                        return [];
                    } else {
                        return await db.currency.findAll({
                            include: [
                                {
                                    model: db.country,
                                    where: { id: country.id }
                                }
                            ]
                        });
                    }
                }
            }
        }
    },
    Mutation: {
        createAdvertiser: async (
            _root,
            {
                input: {
                    name,
                    nature_of_business,
                    address,
                    city,
                    zip_code,
                    postal_address,
                    postal_city,
                    postal_zip_code,
                    phone,
                    email,
                    contacts,
                    stateId,
                    postalStateId,
                    justBrilliantGuideId
                }
            },
            { user, clientIp }
        ) => {
            const tempAdvertiser = {
                name,
                nature_of_business,
                address,
                city,
                zip_code,
                postal_address,
                postal_city,
                postal_zip_code,
                phone,
                email,
                stateId,
                postalStateId,
                justBrilliantGuideId,
                contacts
            };

            let create_advertiser = db.advertiser.build(
                { ...tempAdvertiser },
                { include: { model: db.contact, as: "contacts" } }
            );

            try {
                await create_advertiser.save();
            } catch (error) {
                throw new UserInputError(
                    `Advertiser name ${name} was not created.\nError Message: ${
                        error.message
                    }`
                );
            }

            handleCreateActionActivityLog(
                create_advertiser,
                tempAdvertiser,
                user,
                clientIp
            );

            return create_advertiser;
        },
        editAdvertiser: async (
            _root,
            {
                input: {
                    id,
                    name,
                    nature_of_business,
                    address,
                    city,
                    zip_code,
                    postal_address,
                    postal_city,
                    postal_zip_code,
                    phone,
                    email,
                    contacts,
                    delete_contacts = [],
                    stateId,
                    postalStateId
                }
            },
            { user, clientIp }
        ) => {
            const tempAdvertiser = {
                name,
                nature_of_business,
                address,
                city,
                zip_code,
                postal_address,
                postal_city,
                postal_zip_code,
                phone,
                email,
                stateId,
                postalStateId
            };

            if (!(await db.advertiser.findByPk(id))) {
                throw new UserInputError(`Advertiser ID ${id} was not found.`);
            }

            try {
                await db.advertiser.update(
                    {
                        ...tempAdvertiser
                    },
                    { where: { id } }
                );
            } catch (error) {
                throw new UserInputError(error);
            }

            //Update contacts here
            let updated_advertiser = await db.advertiser.findByPk(id);
            for await (const {
                id,
                name,
                title,
                phone,
                mobile,
                email
            } of contacts) {
                if (Boolean(id)) {
                    //Edit existing Contact
                    const temp = await db.contact.findByPk(id);
                    if (!Boolean(temp)) {
                        throw new UserInputError(
                            `Contact ID ${id} was not found.`
                        );
                    }
                    try {
                        await db.contact.update(
                            {
                                name,
                                title,
                                phone,
                                mobile,
                                email
                            },
                            { where: { id } }
                        );
                    } catch (error) {
                        throw new UserInputError(error);
                    }

                    handleUpdateActionActivityLog(
                        temp,
                        {
                            name,
                            title,
                            phone,
                            mobile,
                            email
                        },
                        user,
                        clientIp
                    );
                } else {
                    //Create new contact
                    let contact = db.contact.build({
                        name,
                        title,
                        phone,
                        mobile,
                        email
                    });
                    try {
                        await contact.save();
                    } catch (error) {
                        throw new UserInputError(error);
                    }

                    try {
                        await updated_advertiser.addContact(contact);
                    } catch (error) {
                        throw new UserInputError(error);
                    }

                    handleCreateActionActivityLog(
                        contact,
                        { name, title, phone, mobile, email },
                        user,
                        clientIp
                    );
                }
            }

            //Deleting users
            if (Array.isArray(delete_contacts) && delete_contacts.length > 0) {
                try {
                    await updated_advertiser.removeContacts(delete_contacts);
                } catch (error) {
                    throw new UserInputError(error);
                }
            }

            //Logging and deleting contacts
            for await (const deleteContactId of delete_contacts) {
                const contact = await db.contact.findByPk(deleteContactId);
                if (!contact) {
                    throw new UserInputError(
                        `Unable to find Contact ID ${deleteContactId}`
                    );
                }
                const { name, title, phone, mobile, email } = contact;
                handleDeleteActionActivityLog(
                    contact,
                    { name, title, phone, mobile, email },
                    user,
                    clientIp
                );
                await contact.destroy();
            }

            handleUpdateActionActivityLog(
                updated_advertiser,
                { ...tempAdvertiser, contacts, delete_contacts },
                user,
                clientIp
            );

            return updated_advertiser;
        }
    },
    Advertiser: {
        state: async advertiser => await db.state.findByPk(advertiser.stateId),
        postal_state: async advertiser =>
            await db.state.findByPk(advertiser.postalStateId),
        just_brilliant_guide: async advertiser =>
            await db.just_brilliant_guide.findByPk(
                advertiser.justBrilliantGuideId
            ),
        contacts: async advertiser =>
            await db.contact.findAll({
                include: [
                    {
                        model: db.advertiser,
                        where: { id: advertiser.id }
                    }
                ]
            }),
        advertising: async advertiser =>
            await db.advertising.findAll({
                where: { advertiserId: advertiser.id }
            }),
        active_advertising: async advertiser => {
            const advertisement = await db.advertising.findOne({
                where: { advertiserId: advertiser.id },
                order: [["agreement_date", "DESC"]]
            });

            const { expire_date = null } = advertisement || {};
            const difference = Boolean(expire_date)
                ? Date.parse(expire_date) - Date.parse(new Date())
                : null;
            if (difference === null || difference < 0) {
                //Contract is expired
                return null;
            } else {
                return advertisement;
            }
        }
    }
};
