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
        layout: async de => {
            return await db.layout.findByPk(de.layoutId);
        },
        systems: async gallery => {
            return await db.system.findAll({
                include: [
                    {
                        model: db.gallery,
                        where: { id: gallery.id }
                    }
                ]
            });
        },
        media: async gallery => {
            return await db.media.findAll({
                include: [
                    {
                        model: db.gallery,
                        where: { id: gallery.id }
                    }
                ]
            });
        }
    }
};
