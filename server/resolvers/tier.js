import db from "../models";

export default {
    Query: {
        tier: async (_root, { id }, { user }) => {
            return await db.tier.findById(id);
        },

        tiers: async (_root, _input, { user }) => {
            return await db.tier.findAll();
        },

        tiers_by_system: async (root, { id }, { user }) => {
            return await db.tier.findAll(
                {
                    where: {
                        is_parent: true
                    }
                },
                {
                    include: [
                        {
                            model: db.system,
                            where: { id: id },
                            through: {
                                where: { is_parent: true }
                            }
                        }
                    ]
                }
            );
        }
    },
    Tier: {
        systems: async tier => {
            return await db.tier.findAll({
                include: [
                    {
                        model: db.tier,
                        where: { id: tier.id }
                    }
                ]
            });
        },
        child_tiers: async row => {
            return await db.tier.findAll({
                where: {
                    tierId: row.id
                }
            });
        },
        child_category: async row => {
            return await db.tier.findAll({
                where: {
                    tierId: row.id
                }
            });
        },
        content_layout: async tier => {
            return await db.content_layout.findById(tier.contentLayoutId);
        },

        directories: async tier => {
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
            const activeDirectoryList = await db.directory.findAll({
                include: [
                    {
                        model: db.tier,
                        where: { id: tier.id },
                        through: { where: { active: true } }
                    }
                ]
            });

            for (let index = 0; index < activeDirectoryList.length; ++index) {
                activeDirectoryList[index].active = true;
            }

            const inactiveDirectoryList = await db.directory.findAll({
                include: [
                    {
                        model: db.tier,
                        where: { id: tier.id },
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
        directories_active: async tier => {
            return await db.directory.findAll({
                include: [
                    {
                        model: db.tier,
                        where: { id: tier.id },
                        through: { where: { active: true } }
                    }
                ]
            });
        }
    }
};
