import db from "../models";

export default {
    Query: {
        advertising: async (_root, { id }) => await db.advertising.findByPk(id),
        advertisings: async (_root, _input, { user }) =>
            await db.advertising.findAll()
    },
    Advertising: {
        media: async ({ mediumId }) => await db.media.findByPk(mediumId),
        advertiser: async ({ advertiserId }) =>
            await db.advertiser.findByPk(advertiserId),
        artwork_size: async ({ artworkSizeId }) =>
            await db.artwork_size.findByPk(artworkSizeId),
        payments: async ({ id }) =>
            await db.payment.findAll({ where: { advertisingId: id } }),
        articles: async ({ id }) =>
            await db.article.findAll({
                include: [
                    {
                        model: db.advertising,
                        where: { id }
                    }
                ]
            })
    }
};
