import db from "../models";

export default {
    Query: {
        ad_category: async (root, { id }, { user }) => {
            return await db.ad_category.findById(id);
        },
        ad_categories: async (root, input, { user }) => {
            return await db.ad_category.findAll();
        },
        ad_categories_by_venue: async (root, { id }, { user }) => {
            return await db.ad_category.findAll(
                {
                    where: {
                        is_parent: true
                    }
                },
                {
                    include: [
                        {
                            model: db.venue,
                            where: { id: id }
                        }
                    ]
                }
            );
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
        },
        child_category: async row => {
            return await db.ad_category.findAll({
                where: {
                    adCategoryId: row.id
                }
            });
        }
    }
};
