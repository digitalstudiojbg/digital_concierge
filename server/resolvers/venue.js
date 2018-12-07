import db from "../models";
import { checkUserLogin } from "../utils/constant";

export default {
    Query: {
        venue: async (root, { id }, { user }) => {
            return await db.venue.findById(id);
        },
        venues: async (root, input, { user }) => {
            await checkUserLogin(user);

            return await db.venue.findAll();
        }
    },
    Venue: {
        users: async venue => {
            return await db.user.findAll({
                where: {
                    venueId: venue.id
                }
            });
        },
        roles: async venue => {
            return await db.role.findAll({
                include: [
                    {
                        model: db.venue,
                        where: { id: venue.id }
                    }
                ]
            });
        },
        tb_categories: async venue => {
            return await db.tb_category.findAll({
                include: [
                    {
                        model: db.venue,
                        where: { id: venue.id },
                        through: { where: { is_parent: true } }
                    }
                ]
            });
        },
        tb_landing_page: async venue => {
            return await db.tb_landing_page.findAll({
                where: {
                    venueId: venue.id
                }
            });
        },
        global_setting: async venue => {
            return await db.global_setting.findAll({
                where: {
                    venueId: venue.id
                }
            });
        },
        ad_categories: async venue => {
            return await db.ad_category.findAll({
                include: [
                    {
                        model: db.venue,
                        where: { id: venue.id }
                    }
                ]
            });
        }
    }
};
