import db from "../models";

export default {
    Query: {
        system: async (root, { id }, { user }) => {
            return await db.system.findById(id);
        },
        systems: async (root, input, { user }) => {
            return await db.system.findAll();
        }
    },
    System: {
        venue: async system => {
            return await db.venue.findById(system.venueId);
        },
        tiers: async system => {
            return await db.tier.findAll({
                include: [
                    {
                        model: db.system,
                        where: { id: system.id }
                    }
                ]
            });
        }
    }
};
