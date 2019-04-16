import db from "../models";
import { UserInputError } from "apollo-server-express";
import {
    checkUserClientByDirectoryList,
    checkUserPermissionModifySystem,
    checkUserLogin,
    asyncForEach,
    handleCreateActionActivityLog
} from "../utils/constant";

export default {
    Query: {
        directoryEntry: async (_root, { id }) => {
            const entry = await db.directory_entry.findByPk(id);
            console.log(Object.keys(entry.__proto__));
            return entry;
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
        },
        createDirectoryEntry: async (
            _root,
            {
                input: {
                    name,
                    title,
                    title_plaintext,
                    description,
                    order,
                    parent_ids,
                    layout_id,
                    template_id,
                    system_id,
                    image,
                    media_id,
                    colours
                }
            },
            { user, clientIp }
        ) => {
            await checkUserLogin(user);

            //Upload and Create image
            let created_media;
            if (image) {
                const { clientId = "" } =
                    (await db.system.findByPk(system_id)) || {};
                if (!Boolean(clientId)) {
                    throw new UserInputError(`Invalid system ID ${system_id}`);
                }
                created_media = await processUploadMedia(
                    image,
                    clientId,
                    "image"
                );
            } else if (media_id) {
                created_media = await db.media.findByPk(media_id);
            }

            //Create directory entry
            let created_dir_entry = db.directory_entry.build({
                name,
                title,
                title_plaintext,
                description,
                order,
                layoutId: layout_id,
                templateId: template_id,
                ...processColours(colours)
            });

            try {
                await created_dir_entry.save();
            } catch (e) {
                //Delete image if user input is invalid (if user uploaded an image)
                try {
                    Boolean(image) && processDelete(created_media.key);
                } catch (e) {
                    throw new UserInputError(e);
                }
                throw new UserInputError(e);
            }

            try {
                //Assign media
                await created_dir_entry.addMedia(created_media);
            } catch (error) {
                throw new UserInputError(
                    `Create Directory Entry ${name} status failed.\nError Message: ${
                        error.message
                    }`
                );
            }

            try {
                //Assign Directory Lists
                await created_dir_entry.addDirectory_lists(parent_ids);
            } catch (error) {
                throw new UserInputError(
                    `Create Directory Entry ${name} status failed.\nError Message: ${
                        error.message
                    }`
                );
            }

            handleCreateActionActivityLog(
                created_dir_entry,
                {
                    name,
                    title,
                    title_plaintext,
                    description,
                    order,
                    parent_ids,
                    layout_id,
                    template_id,
                    system_id,
                    image,
                    media_id,
                    colours
                },
                user,
                clientIp
            );

            return created_dir_entry;
        },
        editDirectoryEntry: async (
            _root,
            {
                input: {
                    id,
                    name,
                    title,
                    title_plaintext,
                    description,
                    order,
                    parent_ids,
                    layout_id,
                    template_id,
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

            if (!Boolean(system)) {
                throw new UserInputError(`Invalid system ID ${system_id}`);
            }

            let updated_image = null;
            let updated_directory_entry;

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
                updated_directory_entry = await db.directory_entry.update(
                    {
                        name,
                        title,
                        title_plaintext,
                        description,
                        order,
                        layoutId: layout_id,
                        templateId: template_id,
                        ...processColours(colours)
                    },
                    { where: { id } }
                );
                try {
                    //Get update directory entry from DB
                    to_update = await db.directory_entry.findByPk(id);
                    try {
                        //Set directory list relationship
                        await to_update.setDirectory_lists(parent_ids);
                        try {
                            //Get list of media from update directory entry from DB
                            const to_delete_images = await to_update.getMedia();
                            if (Boolean(image) || Boolean(media_id)) {
                                try {
                                    //Remove relationship between list and previous image in DB
                                    await to_update.removeMedia(
                                        to_delete_images
                                    );

                                    try {
                                        //Add new image into directory in DB (if user upload a new image)
                                        Boolean(image) &&
                                            (await to_update.addMedia(
                                                updated_image
                                            ));
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
            } catch (err) {
                throw new UserInputError(err);
            }
            return to_update;
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
        ],
        template: async de => await db.template.findByPk(de.templateId)
    }
};
