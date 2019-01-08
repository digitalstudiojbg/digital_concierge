import db from "../models";

export default {
    Query: {
        jbgDirectoryEntry: async (_root, { id }) => {
            return await db.jbg_directory_entry.findByPk(id);
        },
        jbgDirectoryEntries: async (_root, _input, { user }) => {
            return await db.jbg_directory_entry.findAll();
        }
    },
    JbgDirectoryEntry: {
        jbgDirectoryLists: async jde => {
            return await db.jbg_directory_list.findAll({
                include: [
                    {
                        model: db.jbg_directory_entry,
                        where: { id: jde.id }
                    }
                ]
            });
        },
        layout: async jde => {
            return await db.layout.findByPk(jde.layoutId);
        },
        media: async jde => {
            return await db.media.findAll({
                include: [
                    {
                        model: db.jbg_directory_entry,
                        where: { id: jde.id }
                    }
                ]
            });
        }
    }
};
