import db from "../models";
import {
    checkUserLogin,
    checkUserJBG,
    processUploadMedia,
    handleCreateActionActivityLog,
    handleUpdateActionActivityLog
} from "../utils/constant";
import { UserInputError } from "apollo-server-express";

export default {
    Query: {
        justBrilliantGuide: async (_root, { id }) => {
            return await db.just_brilliant_guide.findByPk(id);
        },
        justBrilliantGuides: async (_root, _input, { user }) => {
            return await db.just_brilliant_guide.findAll();
        }
    },
    Mutation: {
        createJustBrilliantGuide: async (
            _root,
            {
                input: {
                    name,
                    welcomeFamilyId,
                    featureFamilyId,
                    informationFamilyId,
                    mapFamilyId,
                    galleryFamilyId,
                    marketFamilyId,
                    foodFamilyId,
                    attractionFamilyId,
                    eventFamilyId,
                    essentialFamilyId,
                    image
                }
            },
            { user, clientIp }
        ) => {
            await checkUserLogin(user);
            await checkUserJBG(user);

            //Handle upload image
            const uploaded = await processUploadMedia(
                image,
                user.clientId,
                "image"
            );

            //Create just brilliant guide
            let created = db.just_brilliant_guide.build({
                name,
                welcomeFamilyId,
                featureFamilyId,
                informationFamilyId,
                mapFamilyId,
                galleryFamilyId,
                marketFamilyId,
                foodFamilyId,
                attractionFamilyId,
                eventFamilyId,
                essentialFamilyId
            });

            try {
                await created.save();
            } catch (e) {
                throw new UserInputError(e);
            }

            try {
                //Assign media
                await created.addMedia(uploaded);
            } catch (error) {
                throw new UserInputError(
                    `Assign publication ${name} to image failed.\nError Message: ${
                        error.message
                    }`
                );
            }

            //Activity Log
            handleCreateActionActivityLog(
                created,
                {
                    name,
                    welcomeFamilyId,
                    featureFamilyId,
                    informationFamilyId,
                    mapFamilyId,
                    galleryFamilyId,
                    marketFamilyId,
                    foodFamilyId,
                    attractionFamilyId,
                    eventFamilyId,
                    essentialFamilyId,
                    mediaId: uploaded.id
                },
                user,
                clientIp
            );

            return created;
        },
        editJustBrilliantGuide: async (
            _root,
            {
                input: {
                    id,
                    name,
                    welcomeFamilyId,
                    featureFamilyId,
                    informationFamilyId,
                    mapFamilyId,
                    galleryFamilyId,
                    marketFamilyId,
                    foodFamilyId,
                    attractionFamilyId,
                    eventFamilyId,
                    essentialFamilyId,
                    image = null
                }
            },
            { user, clientIp }
        ) => {
            await checkUserLogin(user);
            await checkUserJBG(user);

            if (!(await db.just_brilliant_guide.findByPk(id))) {
                //Check if guide exists in the first place
                throw new UserInputError(
                    `Just Brilliant Guide ID ${id} does not exist`
                );
            }

            try {
                await db.just_brilliant_guide.update(
                    {
                        name,
                        welcomeFamilyId,
                        featureFamilyId,
                        informationFamilyId,
                        mapFamilyId,
                        galleryFamilyId,
                        marketFamilyId,
                        foodFamilyId,
                        attractionFamilyId,
                        eventFamilyId,
                        essentialFamilyId
                    },
                    { where: { id } }
                );
            } catch (error) {
                throw new UserInputError("Error updating guide: ", error);
            }

            const updated = await db.just_brilliant_guide.findByPk(id);
            let uploaded = null;

            //Delete previous images
            try {
                const to_delete_images = await updated.getMedia();

                if (Boolean(image)) {
                    try {
                        //Remove relationship between list and previous image in DB
                        await updated.removeMedia(to_delete_images);
                    } catch (errorRemoveMedia) {
                        throw new UserInputError(
                            "Error removing previous media relationship ",
                            errorRemoveMedia
                        );
                    }

                    try {
                        //Handle upload image
                        uploaded =
                            Boolean(image) &&
                            (await processUploadMedia(
                                image,
                                user.clientId,
                                "image"
                            ));

                        Boolean(uploaded) && (await updated.addMedia(uploaded));
                    } catch (errorUploadMedia) {
                        throw new UserInputError(
                            "Error uploading & assigning media ",
                            errorUploadMedia
                        );
                    }
                }
            } catch (error) {
                throw new UserInputError(error);
            }

            handleUpdateActionActivityLog(
                updated,
                {
                    id,
                    name,
                    welcomeFamilyId,
                    featureFamilyId,
                    informationFamilyId,
                    mapFamilyId,
                    galleryFamilyId,
                    marketFamilyId,
                    foodFamilyId,
                    attractionFamilyId,
                    eventFamilyId,
                    essentialFamilyId,
                    ...(Boolean(image) && { mediaId: uploaded.id })
                },
                user,
                clientIp
            );

            return updated;
        }
    },
    JustBrilliantGuide: {
        jbg_welcome: async jbg =>
            await db.jbg_welcome.findByPk(jbg.jbgWelcomeId),
        systems: async jbg =>
            await db.system.findAll({
                include: [
                    {
                        model: db.just_brilliant_guide,
                        where: { id: jbg.id }
                    }
                ]
            }),
        jbg_maps: async jbg =>
            await db.jbg_map.findAll({
                include: [
                    {
                        model: db.just_brilliant_guide,
                        where: { id: jbg.id }
                    }
                ]
            }),
        jbg_directory_lists: async jbg =>
            await db.jbg_directory_list.findAll({
                include: [
                    {
                        model: db.just_brilliant_guide,
                        where: { id: jbg.id }
                    }
                ]
            }),
        media: async jbg =>
            await db.media.findAll({
                include: [
                    {
                        model: db.just_brilliant_guide,
                        where: { id: jbg.id }
                    }
                ]
            }),
        welcomeFamily: async jbg =>
            await db.jbg_layout_family.findByPk(jbg.welcomeFamilyId),
        featureFamily: async jbg =>
            await db.jbg_layout_family.findByPk(jbg.featureFamilyId),
        informationFamily: async jbg =>
            await db.jbg_layout_family.findByPk(jbg.informationFamilyId),
        mapFamily: async jbg =>
            await db.jbg_layout_family.findByPk(jbg.mapFamilyId),
        galleryFamily: async jbg =>
            await db.jbg_layout_family.findByPk(jbg.galleryFamilyId),
        marketFamily: async jbg =>
            await db.jbg_layout_family.findByPk(jbg.marketFamilyId),
        foodFamily: async jbg =>
            await db.jbg_layout_family.findByPk(jbg.foodFamilyId),
        attractionFamily: async jbg =>
            await db.jbg_layout_family.findByPk(jbg.attractionFamilyId),
        eventFamily: async jbg =>
            await db.jbg_layout_family.findByPk(jbg.eventFamilyId),
        essentialFamily: async jbg =>
            await db.jbg_layout_family.findByPk(jbg.essentialFamilyId)
    }
};
