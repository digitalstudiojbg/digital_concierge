import db from "../models";

export default {
    Query: {
        home: async (_root, { id }) => {
            return await db.home.findByPk(id);
        },
        homes: async (_root, _input, { user }) => {
            return await db.home.findAll();
        }
    },
    Home: {
        layout: async home => {
            return await db.layout.findByPk(home.layoutId);
        },
        systems: async home => {
            return await db.system.findAll({
                include: [
                    {
                        model: db.gallery,
                        where: { id: home.id }
                    }
                ]
            });
        },
        media: async home => {
            return await db.media.findAll({
                include: [
                    {
                        model: db.gallery,
                        where: { id: home.id }
                    }
                ]
            });
        }
    }
};
