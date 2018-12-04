import db from "../models";

export default {
    Query: {
        global_setting: async (root, { id }, { user }) => {
            return await db.global_setting.findById(id);
        },

        global_settings: async (root, input, { user }) => {
            return await db.global_setting.findAll();
        }
    },
    Global_Setting: {
        venue: async global_setting => {
            return await db.venue.findById(global_setting.venueId);
        }
    }
};
