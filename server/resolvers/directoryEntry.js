import db from "../models";
import { UserInputError } from "apollo-server-express";
import {
    checkUserClientByDirectoryList,
    checkUserPermissionModifySystem,
    checkUserLogin,
    asyncForEach
} from "../utils/constant";

export default {
    Query: {
        directoryEntry: async (_root, { id }) => {
            return await db.directory_entry.findByPk(id);
        },
        directoryEntries: async (_root, _input, { user }) => {
            return await db.directory_entry.findAll();
        }
    },
    Mutation: {
        changeDirectoryListAndEntryStatus: async (
            _root,
            { directoryEntryIdList, directoryListIdList, status, systemId },
            { user }
        ) => {
            await checkUserLogin(user);
            const system = await db.system.findByPk(systemId);
            if (!Boolean(system)) {
                throw new UserInputError(
                    `System with id ${systemId} was not found`
                );
            }
            await checkUserPermissionModifySystem(user, system);
            if (
                Boolean(directoryEntryIdList) &&
                directoryEntryIdList.length > 0
            ) {
                await asyncForEach(directoryEntryIdList, async each => {
                    const { directoryEntryId, directoryListId } = each;
                    const select_directory_entry = await db.directory_entry.findByPk(
                        directoryEntryId
                    );
                    if (!Boolean(select_directory_entry)) {
                        throw new UserInputError(
                            `Directory Entry with id ${directoryEntryId} was not found`
                        );
                    }
                    const select_directory_list = await db.directory_list.findByPk(
                        directoryListId
                    );
                    if (!Boolean(select_directory_list)) {
                        throw new UserInputError(
                            `Directory List with id ${directoryListId} was not found`
                        );
                    }
                    await checkUserClientByDirectoryList(
                        user,
                        select_directory_list
                    );
                    try {
                        await select_directory_list.addDirectory_entry(
                            select_directory_entry,
                            { through: { active: status } }
                        );
                    } catch (error) {
                        throw new UserInputError(
                            `Update Directory Entry id ${directoryEntryId} for Directory List id ${directoryListId} status failed.\nError Message: ${
                                error.message
                            }`
                        );
                    }
                });
            }
            if (
                Boolean(directoryListIdList) &&
                directoryListIdList.length > 0
            ) {
                await asyncForEach(directoryListIdList, async each => {
                    const select_directory_list = await db.directory_list.findByPk(
                        each
                    );
                    if (!select_directory_list) {
                        throw new UserInputError(
                            `Directory List with id ${
                                each.directoryListId
                            } was not found`
                        );
                    }
                    await checkUserClientByDirectoryList(
                        user,
                        select_directory_list
                    );
                    try {
                        // await select_directory_list.addSystem(system, {
                        //     through: { active: status }
                        // });
                        select_directory_list.active = status;
                        select_directory_list.save();
                    } catch (error) {
                        throw new UserInputError(
                            `Update Directory List id ${each} status failed.\nError Message: ${
                                error.message
                            }`
                        );
                    }
                });
            }
            return { result: true };
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
