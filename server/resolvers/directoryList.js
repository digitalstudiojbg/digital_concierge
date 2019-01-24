import db from "../models";
import {
    checkUserPermissionModifySystem,
    checkUserLogin
} from "../utils/constant";
import { UserInputError } from "apollo-server-express";
import {
    processUploadMedia,
    processUpload,
    processDelete
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
                input: { name, is_root, parent_id, layout_id, system_id, image }
            },
            { user, clientIp }
        ) => {
            await checkUserLogin(user);

            //const system = await db.system.findByPk(system_id);
            //await checkUserPermissionModifySystem(user, system);

            //Upload and Create image
            let created_media;
            if (image) {
                created_media = await processUploadMedia(
                    image,
                    user.id,
                    "image"
                );
            }

            //Create directory list
            let created_dir_list = db.directory_list.build({
                name,
                is_root,
                directoryListId: parent_id,
                layoutId: layout_id,
                systemId: system_id
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
                    is_root,
                    parent_id,
                    layout_id,
                    system_id,
                    image
                }
            },
            { user, clientIp }
        ) => {
            await checkUserLogin(user);
            //const system = await db.system.findByPk(system_id);
            //await checkUserPermissionModifySystem(user, system);

            let updated_image;
            let updated_directory_list;

            //Check if image update
            if (image) {
                updated_image = await processUploadMedia(
                    image,
                    user.id,
                    "image"
                );
            }

            let to_update;
            //Update directory list in DB
            try {
                updated_directory_list = await db.directory_list.update(
                    { name, is_root, parent_id, layout_id, system_id },
                    { where: { id } }
                );
                try {
                    //Get update directory list from DB
                    to_update = await db.directory_list.findByPk(id);
                    try {
                        //Get list of media from update directory list from DB
                        const to_delete_images = await to_update.getMedia();
                        let to_delete_images_key = [];
                        to_delete_images.map(each => {
                            to_delete_images_key.push({
                                key: each.key,
                                id: id
                            });
                        });
                        if (image) {
                            try {
                                //Delete previous images on S3
                                await to_delete_images_key.map(each => {
                                    processDelete(each.key);
                                });
                                try {
                                    //Remove previous image in DB
                                    await to_update.removeMedium(
                                        to_delete_images
                                    );

                                    /*console.log(to_delete_images_key);

                                    await to_delete_images_key.map(each => {
                                        db.media.destroy({
                                            where: { id: each.id }
                                        });
                                    });*/

                                    try {
                                        //Add new image into directory in DB
                                        await to_update.addMedia(updated_image);
                                    } catch (err) {
                                        throw new UserInputError(err);
                                    }
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

        deleteDirectoryList: async (_root, { id }, { user, clientIp }) => {
            let to_delete;
            let to_delete_images;
            console.log(Object.keys(to_delete.__proto__));
            try {
                //Get delete directory list object in DB
                to_delete = await db.directory_list.findByPk(id);
                try {
                    //Get delete image list from directory list object in DB
                    to_delete_images = await to_delete.getMedia();
                    try {
                        //Delete images in DB
                        await to_delete.removeMedium(to_delete_images);
                        try {
                            // Delete directory list in DB
                            db.directory_list.destroy({ where: { id } });
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
            return to_delete;
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
