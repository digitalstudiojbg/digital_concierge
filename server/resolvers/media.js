import db from "../models";

export default {
    Query: {
        medium: async (_root, { id }) => await db.media.findByPk(id),
        media: async (_root, _input, { user }) => await db.media.findAll(),
        mediaByClient: async (
            _root,
            { id, limit, cursor, offset },
            { user }
        ) => {
            let output_data;
            const totalImages = await db.media.findAll({
                where: { clientId: id }
            });

            if (cursor) {
                output_data = await db.media.findAll({
                    where: { clientId: id },
                    limit,
                    where: {
                        createdAt: {
                            [db.op.ls]: cursor
                        }
                    },
                    order: [["createdAt", "DESC"]]
                });
            } else if (offset) {
                output_data = await db.media.findAll({
                    where: { clientId: id },
                    limit,
                    offset,
                    order: [["createdAt", "DESC"]]
                });
            } else {
                output_data = await db.media.findAll({
                    where: { clientId: id },
                    limit,
                    order: [["createdAt", "DESC"]]
                });
            }

            output_data.map(each => {
                each["totalImages"] = totalImages.length;
            });

            return output_data;
        },
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
