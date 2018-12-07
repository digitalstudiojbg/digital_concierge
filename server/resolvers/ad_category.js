import db from "../models";

export default {
    Query: {
        ad_category: async (root, { id }, { user }) => {
            return await db.ad_category.findById(id);
        },
        ad_categories: async (root, input, { user }) => {
            return await db.ad_category.findAll();
        }
    },

    TB_Category: {}
};
