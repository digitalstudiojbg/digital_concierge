import db from "../models";

export default {
    Query: {
        ad_directory: async (root, { id }, { user }) => {
            return await db.ad_directory.findById(id);
        },
        ad_directories: async (root, input, { user }) => {
            return await db.ad_directory.findAll();
        }
    },

    AD_Directory: {
        ad_directory_type: async ad_directory => {
            return await db.ad_directory_type.findById(
                ad_directory.adDirectoryTypeId
            );
        },
        ad_categories: async ad_directory => {
            return await db.ad_category.findAll({
                include: [
                    {
                        model: db.ad_directory,
                        where: { id: ad_directory.id }
                    }
                ]
            });
        }
    }
};
