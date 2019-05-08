import db from "../models";

export default {
    Query: {
        advertiser: async (_root, { id }) => await db.advertiser.findByPk(id),
        advertisers: async (_root, _input, { user }) =>
            await db.advertiser.findAll()
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
