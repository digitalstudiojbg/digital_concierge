import db from "../models";
import {
    checkUserPermissionModifySystem,
    checkUserLogin,
    asyncForEach
} from "../utils/constant";
import { UserInputError } from "apollo-server-express";
import {
    processUploadMedia,
    processUpload,
    processDelete,
    processColours
} from "../utils/constant";
import { log } from "util";

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
            {
                input: {
                    name,
                    title,
                    description,
                    order,
                    is_root,
                    parent_id,
                    layout_id,
                    system_id,
                    image,
                    media_id,
                    colours
                }
            },
            { user, clientIp }
        ) => {
            await checkUserLogin(user);

            //const system = await db.system.findByPk(system_id);
            //await checkUserPermissionModifySystem(user, system);

            //Upload and Create image
            let created_media;
            if (image) {
                const { clientId } = await db.system.findByPk(system_id);
                created_media = await processUploadMedia(
                    image,
                    clientId,
                    "image"
                );
            } else if (media_id) {
                created_media = await db.media.findByPk(media_id);
            }

            //Create directory list
            let created_dir_list = db.directory_list.build({
                name,
                is_root,
                title,
                description,
                order,
                directoryListId: parent_id,
                layoutId: layout_id,
                systemId: system_id,
                ...processColours(colours)
            });

            try {
                await created_dir_list.save();
            } catch (e) {
                //Delete image if user input is invalid
                try {
                    processDelete(created_media.key);
                } catch (e) {
                    throw new UserInputError(e);
                }
                throw new UserInputError(e);
            }

            try {
                //Assign media
                await created_dir_list.addMedia(created_media);
            } catch (error) {
                throw new UserInputError(
                    `Create Directory List ${name} status failed.\nError Message: ${
                        error.message
                    }`
                );
            }

            return created_dir_list;
        },
        editDirectoryList: async (
            _root,
            {
                input: {
                    id,
                    name,
                    title,
                    description,
                    order,
                    is_root,
                    parent_id,
                    layout_id,
                    system_id,
                    image,
                    media_id,
                    colours
                }
            },
            { user, clientIp }
        ) => {
            await checkUserLogin(user);
            const system = await db.system.findByPk(system_id);
            //await checkUserPermissionModifySystem(user, system);

            let updated_image = null;
            let updated_directory_list;

            //Check if image update
            if (image) {
                updated_image = await processUploadMedia(
                    image,
                    system.clientId,
                    "image"
                );
            } else if (media_id) {
                //If Image was changed from media library
                updated_image = await db.media.findByPk(media_id);
            }

            let to_update;
            //Update directory list in DB
            try {
                updated_directory_list = await db.directory_list.update(
                    {
                        name,
                        is_root,
                        title,
                        description,
                        order,
                        directoryListId: parent_id,
                        layoutId: layout_id,
                        systemId: system_id,
                        ...processColours(colours)
                    },
                    { where: { id } }
                );
                try {
                    //Get update directory list from DB
                    to_update = await db.directory_list.findByPk(id);
                    try {
                        //Get list of media from update directory list from DB
                        const to_delete_images = await to_update.getMedia();
                        // let to_delete_images_key = [];
                        // to_delete_images.map(each => {
                        //     to_delete_images_key.push({
                        //         key: each.key,
                        //         id: id
                        //     });
                        // });
                        if (Boolean(image) || Boolean(media_id)) {
                            //Delete previous images on S3
                            /*await to_delete_images_key.map(each => {
                                        processDelete(each.key);
                                    });*/
                            try {
                                //Remove relationship between list and previous image in DB
                                await to_update.removeMedia(to_delete_images);

                                try {
                                    //Add new image into directory in DB
                                    await to_update.addMedia(updated_image);
                                } catch (err) {
                                    throw new UserInputError(err);
                                }
                            } catch (err) {
                                throw new UserInputError(err);
                            }
                        }
                    } catch (err) {
                        throw new UserInputError(err);
                    }
                } catch (err) {
                    throw new UserInputError(err);
                }
            } catch (err) {
                throw new UserInputError(err);
            }
            return to_update;
        },

        deleteDirectoryListEntry: async (
            _root,
            { directoryEntryIdList, directoryListIdList, systemId },
            { user, clientIp }
        ) => {
            await checkUserLogin(user);
            /*const system = await db.system.findByPk(systemId);
            if (!Boolean(system)) {
                throw new UserInputError(
                    `System with id ${systemId} was not found`
                );
            }
            await checkUserPermissionModifySystem(user, system);*/

            //Delete entries
            await asyncForEach(directoryEntryIdList, async each => {
                const { directoryEntryId, directoryListId } = each;
                let select_directory_list;
                let media_list;
                let select_directory_entry_other_list;

                //Retrieve entry
                const select_directory_entry = await db.directory_entry.findByPk(
                    directoryEntryId
                );
                if (!select_directory_entry) {
                    throw new UserInputError(
                        `Dir Entry ${directoryEntryId} not found!`
                    );
                }

                try {
                    //Retrieve list
                    select_directory_list = await db.directory_list.findByPk(
                        directoryListId
                    );
                } catch (err) {
                    throw new UserInputError(err);
                }

                try {
                    //Retrieve media list from entry
                    media_list = await select_directory_entry.getMedia();
                } catch (err) {
                    throw new UserInputError(err);
                }

                try {
                    //Retrieve list of directories from selected entry
                    select_directory_entry_other_list = await select_directory_entry.getDirectory_lists();
                } catch (err) {
                    throw new UserInputError(err);
                }

                //Delete entry row if there is no second list has this entry
                if (select_directory_entry_other_list.length === 1) {
                    try {
                        //Delete relationship between selected entry and media
                        await select_directory_entry.removeMedia(media_list);
                    } catch (err) {
                        throw new UserInputError(err);
                    }

                    try {
                        //Delete relationship between selected directory list and selected entry
                        await select_directory_entry.removeDirectory_lists(
                            select_directory_entry_other_list
                        );
                    } catch (err) {
                        throw new UserInputError(err);
                    }

                    //Delete relationship between selected directory entry from selected directory list
                    try {
                        await db.directory_entry.destroy({
                            where: { id: directoryEntryId }
                        });
                    } catch (err) {
                        throw new UserInputError(err);
                    }
                } else {
                    try {
                        //Delete relationship between selected directory list and selected entry
                        await select_directory_entry.removeDirectory_list(
                            select_directory_list
                        );
                    } catch (err) {
                        throw new UserInputError(err);
                    }
                }
            });

            //Delete lists
            await asyncForEach(directoryListIdList, async list_id => {
                let media_list;

                //Retrieve list
                const list = await db.directory_list.findByPk(list_id);
                if (!list) {
                    throw new UserInputError(`Dir List ${list_id} not found!`);
                }

                try {
                    //Retrieve media list from list
                    media_list = await list.getMedia();
                } catch (err) {
                    throw new UserInputError(err);
                }

                try {
                    //Remove relationship between list and media from list
                    await list.removeMedium(media_list);
                } catch (err) {
                    throw new UserInputError(err);
                }

                try {
                    //Delete list
                    db.directory_list.destroy({ where: { id: list_id } });
                } catch (err) {
                    throw new UserInputError(err);
                }
            });

            return { result: true };
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
        },
        colours: ({
            colour1Hex,
            colour1Alpha,
            colour2Hex,
            colour2Alpha,
            colour3Hex,
            colour3Alpha,
            colour4Hex,
            colour4Alpha,
            colour5Hex,
            colour5Alpha
        }) => [
            { hex: colour1Hex, alpha: colour1Alpha },
            { hex: colour2Hex, alpha: colour2Alpha },
            { hex: colour3Hex, alpha: colour3Alpha },
            { hex: colour4Hex, alpha: colour4Alpha },
            { hex: colour5Hex, alpha: colour5Alpha }
        ]
    }
};
