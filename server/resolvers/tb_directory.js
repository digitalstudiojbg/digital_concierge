import db from "../models";

export default {
    Query: {
        tb_directory: async (root, { id }, { user }) => {
            return await db.tb_directory.findById(id);
        },
        tb_directories: async (root, input, { user }) => {
            return await db.tb_directory.findAll();
        }
    },
    TB_Directory: {
        td_categories: async tb_directory => {
            return await db.tb_category.findAll({
                include: [
                    {
                        model: db.tb_directory,
                        where: { id: tb_directory.id }
                    }
                ]
            });
        },
        tb_directory_type: async tb_directory => {
            return await db.tb_directory_type.findById(
                tb_directory.tbDirectoryTypeId
            );
        }
    }
};
