import db from "../models";

export default {
    Query: {
        ad_directory_type: async (root, { id }, { user }) => {
            return await db.ad_directory_type.findById(id);
        },

        ad_directory_types: async (root, input, { user }) => {
            return await db.ad_directory_type.findAll();
        }
    },
    AD_Directory_Type: {}
};
