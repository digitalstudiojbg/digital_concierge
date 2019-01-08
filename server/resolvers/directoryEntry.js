import db from "../models";

export default {
    Query: {
        directoryEntry: async (_root, { id }) => {
            return await db.directory_entry.findByPk(id);
        },
        directoryEntries: async (_root, _input, { user }) => {
            return await db.directory_entry.findAll();
        }
    },
    DirectoryEntry: {
        directoryLists: async de => {
            return await db.directory_list.findAll({
                include: [
                    {
                        model: db.directory_entry,
                        where: { id: de.id }
                    }
                ]
            });
        },
        layout: async de => {
            return await db.layout.findByPk(de.layoutId);
        },
        media: async de => {
            return await db.media.findAll({
                include: [
                    {
                        model: db.directory_entry,
                        where: { id: de.id }
                    }
                ]
            });
        }
    }
};
