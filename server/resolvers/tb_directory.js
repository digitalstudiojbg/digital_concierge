import db from "../models";
import { UserInputError } from "apollo-server-express";
import { checkUserVenueByCategory, checkUserLogin } from "../utils/constant";

export default {
    Query: {
        tb_directory: async (root, { id }, { user }) => {
            return await db.tb_directory.findById(id);
        },
        tb_directories: async (root, input, { user }) => {
            return await db.tb_directory.findAll();
        }
    },
    Mutation: {
        changeDirectoryStatus: async (
            root,
            { tbCategoryId, tbDirectoryId, status },
            { user }
        ) => {
            await checkUserLogin(user);

            const select_directory = await db.tb_directory.findById(
                tbDirectoryId
            );

            if (!select_directory) {
                throw new UserInputError(
                    `TB_Directory with id ${tbDirectoryId} not found`
                );
            }

            const select_category = await db.tb_category.findById(tbCategoryId);

            if (!select_category) {
                throw new UserInputError(
                    `TB_Category with id ${tbCategoryId} not found`
                );
            }

            await checkUserVenueByCategory(user, select_category);

            try {
                await select_directory.setTb_categories([select_category], {
                    through: { active: status }
                });

                return select_directory;
            } catch (error) {
                throw new UserInputError(
                    `Update TB_Directory id ${tbDirectoryId} for TB_Category id ${tbCategoryId} status failed. `
                );
            }
        }
    },
    TB_Directory: {
        tb_categories: async tb_directory => {
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
        },
        tb_media: async tb_directory => {
            return await db.tb_media.findAll({
                include: [
                    {
                        model: db.tb_directory,
                        where: { id: tb_directory.id }
                    }
                ]
            });
        }
    }
};
