import db from "../models";

export default {
    Query: {
        jbgDirectoryList: async (_root, { id }) => {
            return await db.jbg_directory_list.findByPk(id);
        },
        jbgDirectoryLists: async (_root, _input, { user }) => {
            return await db.jbg_directory_list.findAll();
        },
        jbgDirectoryLists_by_justBrilliantGuide: async (_root, { id }) =>
            await db.jbg_directory_list.findAll({
                include: [
                    {
                        model: db.just_brilliant_guide,
                        where: { id }
                    }
                ]
            })
    },
    JbgDirectoryList: {
        child_jbg_directory_lists: async jdl => {
            return await db.jbg_directory_list.findAll({
                where: {
                    jbgDirectoryListId: jdl.id
                }
            });
        },
        just_brilliant_guides: async jdl => {
            return await db.just_brilliant_guide.findAll({
                include: [
                    {
                        model: db.jbg_directory_list,
                        where: { id: jdl.id }
                    }
                ]
            });
        },
        layout: async jdl => {
            return await db.layout.findByPk(jdl.layoutId);
        },
        jbg_directory_entries: async jdl => {
            const activeJbgDirectoryEntryList = await db.jbg_directory_entry.findAll(
                {
                    include: [
                        {
                            model: db.jbg_directory_list,
                            where: { id: jdl.id },
                            through: { where: { active: true } }
                        }
                    ]
                }
            );

            for (
                let index = 0;
                index < activeJbgDirectoryEntryList.length;
                ++index
            ) {
                activeJbgDirectoryEntryList[index].active = true;
            }

            const inactiveJbgDirectoryEntryList = await db.jbg_directory_entry.findAll(
                {
                    include: [
                        {
                            model: db.jbg_directory_list,
                            where: { id: jdl.id },
                            through: { where: { active: false } }
                        }
                    ]
                }
            );

            for (
                let index = 0;
                index < inactiveJbgDirectoryEntryList.length;
                ++index
            ) {
                inactiveJbgDirectoryEntryList[index].active = false;
            }

            return [
                ...activeJbgDirectoryEntryList,
                ...inactiveJbgDirectoryEntryList
            ].sort((obj1, obj2) => {
                return obj1.id - obj2.id;
            });
        },
        media: async jdl => {
            return await db.media.findAll({
                include: [
                    {
                        model: db.jbg_directory_list,
                        as: "jbgDirectoryListMedia",
                        where: { id: jdl.id }
                    }
                ]
            });
        }
    }
};
