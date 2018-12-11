import db from "../models";

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
            { tbCategoryId, status },
            { user }
        ) => {
            const select_category = await db.tb_category.findById(tbCategoryId);

            if (!select_category) {
                throw new UserInputError(
                    `TB_Category with id ${tbCategoryId} not found`
                );
            }

            console.log(select_category);
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
        }
    }
};
