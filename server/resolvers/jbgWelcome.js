import db from "../models";

export default {
    Query: {
        jbgWelcome: async (_root, { id }) => {
            return await db.jbg_welcome.findByPk(id);
        },
        jbgWelcomes: async (_root, _input, { user }) => {
            return await db.jbg_welcome.findAll();
        }
    },
    JbgMap: {
        just_brillant_guides: async jw => {
            return await db.just_brilliant_guide.findAll({
                where: { jbgWelcomeId: jw.id }
            });
        },
        layout: async jw => {
            return await db.layout.findByPk(jw.layoutId);
        },
        media: async jw => {
            return await db.media.findAll({
                include: [
                    {
                        model: db.jbg_welcome,
                        where: { id: jw.id }
                    }
                ]
            });
        }
    }
};
