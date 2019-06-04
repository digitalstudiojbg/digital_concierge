import db from "../models";

export default {
    Query: {
        artworkSize: async (_root, { id }) =>
            await db.artwork_size.findByPk(id),
        artworkSizes: async (_root, _input, { user }) =>
            await db.artwork_size.findAll()
    },
    ArtworkSize: {
        advertisings: async adSize =>
            await db.advertising.findAll({
                include: [
                    {
                        model: db.artwork_size,
                        where: { id: adSize.id }
                    }
                ]
            })
    }
};
