import db from "../models";
import {
    asyncForEach,
    checkUserLogin,
    checkUserVenueByCategory
} from "../utils/constant";
export default {
    Query: {
        tb_category: async (root, { id }, { user }) => {
            return await db.tb_category.findById(id);
        },
        tb_categories: async (root, input, { user }) => {
            return await db.tb_category.findAll();
        },
        tb_categories_by_venue: async (root, { id }, { user }) => {
            return await db.tb_category.findAll({
                include: [
                    {
                        model: db.venue,
                        where: { id: id },
                        through: { where: { is_parent: true } }
                    }
                ]
            });
        }
    },
    Mutation: {
        changeCategoryStatus: async (
            root,
            { tbCategoryIdList, status },
            { user }
        ) => {
            let output = [];
            await checkUserLogin(user);
            await asyncForEach(tbCategoryIdList, async each => {
                const select_category = await db.tb_category.findById(each);
                if (!select_category) {
                    throw new UserInputError(
                        `TB_Category with id ${tbCategoryId} not found`
                    );
                }
                await checkUserVenueByCategory(user, select_category);
                select_category.active = status;
                await select_category.save();
                output.push(select_category);
            });
            return output;
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
            /*return await db.tb_directory.findAll({
                include: [
                    {
                        model: db.tb_category,
                        where: { id: tb_category.id },
                        through: {
                            attributes: ["active"]
                        }
                    }
                ]
            });*/
            const activeDirectoryList = await db.tb_directory.findAll({
                include: [
                    {
                        model: db.tb_category,
                        where: { id: tb_category.id },
                        through: { where: { active: true } }
                    }
                ]
            });

            for (let index = 0; index < activeDirectoryList.length; ++index) {
                activeDirectoryList[index].active = true;
            }

            const inactiveDirectoryList = await db.tb_directory.findAll({
                include: [
                    {
                        model: db.tb_category,
                        where: { id: tb_category.id },
                        through: { where: { active: false } }
                    }
                ]
            });

            for (let index = 0; index < inactiveDirectoryList.length; ++index) {
                inactiveDirectoryList[index].active = false;
            }

            return [...activeDirectoryList, ...inactiveDirectoryList].sort(
                (obj1, obj2) => {
                    return obj1.id - obj2.id;
                }
            );
        },
        tb_directories_active: async tb_category => {
            return await db.tb_directory.findAll({
                include: [
                    {
                        model: db.tb_category,
                        where: { id: tb_category.id },
                        through: { where: { active: true } }
                    }
                ]
            });
        },
        tb_directory_type: async tb_category => {
            return await db.tb_directory_type.findById(
                tb_category.tbDirectoryTypeId
            );
        },
        tb_media: async tb_category => {
            return await db.tb_media.findAll({
                include: [
                    {
                        model: db.tb_category,
                        where: { id: tb_category.id }
                    }
                ]
            });
        },
    }
};
