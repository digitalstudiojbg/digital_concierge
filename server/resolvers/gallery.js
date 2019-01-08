import db from "../models";

export default {
    Query: {
        gallery: async (_root, { id }) => {
            return await db.gallery.findByPk(id);
        },
        galleries: async (_root, _input, { user }) => {
            return await db.gallery.findAll();
        }
    },
    Gallery: {
        layout: async gallery => {
            return await db.layout.findByPk(gallery.layoutId);
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
