import db from "../models";
import { UserInputError } from "apollo-server-express";
import { handleCreateActionActivityLog } from "../utils/constant";

export default {
    Query: {
        advertiser: async (_root, { id }) => await db.advertiser.findByPk(id),
        advertisers: async (_root, _input, { user }) =>
            await db.advertiser.findAll(),
        advertisersByPublication: async (_root, { id }) =>
            await db.advertiser.findAll({
                where: { justBrilliantGuideId: id }
            })
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
                    stateId,
                    postalStateId
                }
            },
            { user, clientIp }
        ) => {}
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

            const { expire_date = null } = advertisement;
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
