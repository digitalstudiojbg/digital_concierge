import db from "../models";

export default {
    Query: {
        jbgMap: async (_root, { id }) => {
            return await db.jbg_map.findByPk(id);
        },
        jbgMaps: async (_root, _input, { user }) => {
            return await db.jbg_map.findAll();
        }
    },
    JbgMap: {
        just_brillant_guides: async jm => {
            return await db.just_brilliant_guide.findAll({
                include: [
                    {
                        model: db.jbg_map,
                        where: { id: jm.id }
                    }
                ]
            });
        },
        layout: async jm => {
            return await db.layout.findByPk(jm.layoutId);
        },
        media: async jm => {
            return await db.media.findAll({
                include: [
                    {
                        model: db.jbg_map,
                        where: { id: jm.id }
                    }
                ]
            });
        }
    }
};
