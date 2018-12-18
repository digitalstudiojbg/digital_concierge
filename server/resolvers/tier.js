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
            return await db.tier.findAll({
                include: [
                    {
                        model: db.system,
                        where: { id: id },
                        through: {
                            where: { is_parent: true }
                        }
                    }
                ]
            });
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
        }
    }
};
