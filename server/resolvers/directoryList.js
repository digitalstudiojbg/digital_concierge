import db from "../models";
import {
    checkUserPermissionModifySystem,
    checkUserLogin
} from "../utils/constant";
import { UserInputError } from "apollo-server-express";

export default {
    Query: {
        directoryList: async (_root, { id }) =>
            await db.directory_list.findByPk(id),
        directoryLists: async (_root, _input, { user }) => {
            return await db.directory_list.findAll();
        },
        directoryLists_by_system: async (_root, { id }) =>
            await db.directory_list.findAll({
                where: { systemId: id, is_root: true }
            })
    },
    Mutation: {
        createDirectoryList: async (
            _root,
            // { name, is_root, parent_id, layout_id, system_id },
            // input,
            { input: { name, is_root, parent_id, layout_id, system_id } },
            { user }
        ) => {
            // await checkUserLogin(user);
            // const system = await db.system.findByPk(system_id);
            // await checkUserPermissionModifySystem(user, system);
            // let created_dir_list = null;
            // try {
            //     created_dir_list = await db.directory_list.create({
            //         name,
            //         is_root,
            //         parentId: parent_id,
            //         layoutId: layout_id,
            //         systemId: system_id
            //     });
            // } catch (error) {
            //     throw new UserInputError(
            //         `Create Directory List ${name} status failed.\nError Message: ${
            //             error.message
            //         }`
            //     );
            // }
            let created_dir_list = db.directory_list.build({
                name,
                is_root,
                parentId: parent_id,
                layoutId: layout_id,
                systemId: system_id
            });
            try {
                await created_dir_list.save();
            } catch (error) {
                throw new UserInputError(
                    `Create Directory List ${name} status failed.\nError Message: ${
                        error.message
                    }`
                );
            }
            console.log("created dir list: ", created_dir_list);
            //Assign media

            return created_dir_list;
        }
    },
    DirectoryList: {
        child_directory_lists: async dl => {
            return await db.directory_list.findAll({
                where: {
                    directoryListId: dl.id
                }
            });
        },
        system: async dl => {
            return await db.system.findByPk(dl.systemId);
        },
        layout: async dl => {
            return await db.layout.findByPk(dl.layoutId);
        },
        directory_entries: async dl => {
            const activeDirectoryEntryList = await db.directory_entry.findAll({
                include: [
                    {
                        model: db.directory_list,
                        where: { id: dl.id },
                        through: { where: { active: true } }
                    }
                ]
            });

            for (
                let index = 0;
                index < activeDirectoryEntryList.length;
                ++index
            ) {
                activeDirectoryEntryList[index].active = true;
            }

            const inactiveDirectoryEntryList = await db.directory_entry.findAll(
                {
                    include: [
                        {
                            model: db.directory_list,
                            where: { id: dl.id },
                            through: { where: { active: false } }
                        }
                    ]
                }
            );

            for (
                let index = 0;
                index < inactiveDirectoryEntryList.length;
                ++index
            ) {
                inactiveDirectoryEntryList[index].active = false;
            }

            return [
                ...activeDirectoryEntryList,
                ...inactiveDirectoryEntryList
            ].sort((obj1, obj2) => {
                return obj1.id - obj2.id;
            });
        },
        media: async dl => {
            return await db.media.findAll({
                include: [
                    {
                        model: db.directory_list,
                        where: { id: dl.id }
                    }
                ]
            });
        }
    }
};
