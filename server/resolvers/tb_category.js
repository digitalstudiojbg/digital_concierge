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
            /*return await db.tb_category.findAll({
                where: {
                    is_parent: true,
                    venueId: id
                }
            });*/
            return await db.venue.findAll({
                include: [
                    {
                        model: db.tb_category,
                        where: {
                            id: tb_category.id,
                            is_parent: true
                        }
                    }
                ]
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
        venues: async tb_category => {
            //return await db.venue.findById(tb_category.venueId);
            return await db.venue.findAll({
                include: [
                    {
                        model: db.tb_category,
                        where: { id: tb_category.id }
                    }
                ]
            });
        },
        tb_directories: async tb_category => {
            return await db.tb_directory.findAll({
                include: [
                    {
                        model: db.tb_category,
                        where: { id: tb_category.id }
                    }
                ]
            });
        }
        /*tb_directory_type: async tb_directory_type => {
            return await db.tb_directory_type.findById({
                where: {
                    tbDirectoryTypeId: tb_directory_type.id
                }
            });
        }*/
    }
};
