import db from "../models";

export default {
    Query: {
        map: async (_root, { id }) => {
            return await db.map.findByPk(id);
        },
        maps: async (_root, _input, { user }) => {
            return await db.map.findAll();
        }
    },
    Map: {
        layout: async map => {
            return await db.layout.findByPk(map.layoutId);
        },
        systems: async map => {
            return await db.system.findAll({
                include: [
                    {
                        model: db.map,
                        where: { id: map.id }
                    }
                ]
            });
        },
        media: async map => {
            return await db.media.findAll({
                include: [
                    {
                        model: db.map,
                        where: { id: map.id }
                    }
                ]
            });
        }
    }
};
