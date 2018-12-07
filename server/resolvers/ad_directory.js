import db from "../models";

export default {
    Query: {
        ad_directory: async (root, { id }, { user }) => {
            return await db.ad_directory.findById(id);
        },
        ad_directories: async (root, input, { user }) => {
            return await db.ad_directory.findAll();
        }
    },

    AD_Directory: {}
};
