import db from "../models";

export default {
    Query: {
        medium: async (_root, { id }) => await db.media.findByPk(id),
        media: async (_root, _input, { user }) => await db.media.findAll(),
        mediaByClient: async (_root, { id }, { user }) =>
            await db.media.findAll({
                include: [
                    {
                        model: db.client,
                        where: { id }
                    }
                ]
            }),
        mediaBySystem: async (_root, { id }, { user }) =>
            await db.media.findAll({
                include: [
                    {
                        model: db.system,
                        where: { id }
                    }
                ]
            })
    },
    Media: {
        client: async media => await db.client.findByPk(media.clientId)
    }
};
