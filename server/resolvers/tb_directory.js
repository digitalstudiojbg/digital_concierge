import db from "../models";
import { UserInputError } from "apollo-server-express";
import {
    checkUserVenueByCategory,
    checkUserLogin,
    asyncForEach
} from "../utils/constant";

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
        changeDirectoryAndCategoryStatus: async (
            root,
            { tbCategoryIdList, tbDirectoryIdList, status },
            { user }
        ) => {
            await checkUserLogin(user);
            if (tbDirectoryIdList) {
                await asyncForEach(tbDirectoryIdList, async each => {
                    const select_directory = await db.tb_directory.findById(
                        each.tbDirectoryId
                    );
                    if (!select_directory) {
                        throw new UserInputError(
                            `TB_Directory with id ${
                                each.tbDirectoryId
                            } not found`
                        );
                    }
                    const select_category = await db.tb_category.findById(
                        each.tbCategoryId
                    );
                    if (!select_category) {
                        throw new UserInputError(
                            `TB_Category with id ${each.tbCategoryId} not found`
                        );
                    }
                    await checkUserVenueByCategory(user, select_category);
                    try {
                        await select_directory.addTb_category(select_category, {
                            through: { active: status }
                        });
                    } catch (error) {
                        throw new UserInputError(
                            `Update TB_Directory id ${
                                each.tbDirectoryId
                            } for TB_Category id ${
                                each.tbCategoryId
                            } status failed.\nError Message: ${error.message}`
                        );
                    }
                });
            }
            if (tbCategoryIdList) {
                await asyncForEach(tbCategoryIdList, async each => {
                    const select_category = await db.tb_category.findById(each);
                    if (!select_category) {
                        throw new UserInputError(
                            `TB_Category with id ${each} not found`
                        );
                    }
                    await checkUserVenueByCategory(user, select_category);
                    select_category.active = status;
                    try {
                        await select_category.save();
                    } catch (error) {
                        throw new UserInputError(
                            `Update TB_Category id ${each} status failed.\nError Message: ${
                                error.message
                            }`
                        );
                    }
                });
            }
            return { result: true };
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
        }
    }
};
