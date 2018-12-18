import db from "../models";
import { log } from "util";

export default {
    Query: {
        tier_layout: async (root, { id }, { user }) => {
            return await db.tier_layout.findById(id);
        },

        tier_layouts: async (oot, input, { user }) => {
            console.log("............");

            return await db.tier_layout.findAll();
        }
    },
    Tier_Layout: {
        validations: async tier_layout => {
            return await db.validation.findAll({
                include: [
                    {
                        model: db.tier_layout,
                        where: { id: tier_layout.id }
                    }
                ]
            });
        },
        tiers: async tier_layout => {
            return await db.tier.findAll({
                where: {
                    tierLayoutId: tier_layout.id
                }
            });
        }
    }
};
