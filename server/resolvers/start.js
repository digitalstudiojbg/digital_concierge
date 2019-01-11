import db from "../models";

export default {
    Query: {
        start: async (_root, { id }) => {
            return await db.start.findByPk(id);
        },
        starts: async (_root, _input, { user }) => {
            return await db.start.findAll();
        }
    },
    Start: {
        layout: async start => await db.layout.findByPk(start.layoutId),
        systems: async start =>
            await db.system.findAll({
                include: [
                    {
                        model: db.start,
                        where: { id: start.id }
                    }
                ]
            }),
        media: async start =>
            await db.media.findAll({
                include: [
                    {
                        model: db.start,
                        as: "startMedia",
                        where: { id: start.id }
                    }
                ]
            })
    }
};
