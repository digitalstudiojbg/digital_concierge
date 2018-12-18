import db from "../models";

export default {
    Query: {
        directory: async (root, { id }, { user }) => {
            return await db.directory.findById(id);
        },

        directories: async (oot, input, { user }) => {
            return await db.directory.findAll();
        }
    },
    Directory: {
        content_layout: async directory => {
            return await db.content_layout.findById(directory.contentLayoutId);
        }
    }
};