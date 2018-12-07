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

    AD_Category: {
        ad_directories: async ad_category => {
            return await db.ad_directory.findAll({
                include: [
                    {
                        model: db.ad_category,
                        where: { id: ad_category.id }
                    }
                ]
            });
        },
        venues: async ad_category => {
            return await db.venue.findAll({
                include: [
                    {
                        model: db.ad_category,
                        where: { id: ad_category.id }
                    }
                ]
            });
        }
    }
};
