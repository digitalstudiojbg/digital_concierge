import db from "../models";

export default {
    Query: {
        tb_category: async (root, { id }, { user }) => {
            return await db.tb_category.findById(id);
        },
        tb_categories: async (root, input, { user }) => {
            return await db.tb_category.findAll({
                where: {
                    is_parent: true
                }
            });
        },
        td_categories_by_venue: async (root, { id }, { user }) => {
            return await db.tb_category.findAll({
                where: {
                    is_parent: true,
                    venueId: id
                }
            });
        }
    },
    TB_Category: {
        child_category: async row => {
            return await db.tb_category.findAll({
                where: {
                    tbCategoryId: row.id
                }
            });
        },
        venue: async tb_category => {
            return await db.venue.findById(tb_category.venueId);
        }
    }
};
