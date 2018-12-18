import db from "../models";

export default {
    Query: {
        content_layout: async (root, { id }, { user }) => {
            return await db.content_layout.findById(id);
        },

        content_layouts: async (oot, input, { user }) => {
            return await db.content_layout.findAll();
        }
    },
    Content_Layout: {
        validations: async content_layout => {
            return await db.validation.findAll({
                include: [
                    {
                        model: db.content_layout,
                        where: { id: content_layout.id }
                    }
                ]
            });
        },
        tiers: async content_layout => {
            return await db.tier.findAll({
                where: {
                    contentLayoutId: content_layout.id
                }
            });
        },
        directories: async content_layout => {
            return await db.directory.findAll({
                where: {
                    contentLayoutId: content_layout.id
                }
            });
        }
    }
};
