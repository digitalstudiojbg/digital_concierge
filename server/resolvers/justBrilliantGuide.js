import db from "../models";

export default {
    Query: {
        justBrilliantGuide: async (_root, { id }) => {
            return await db.just_brilliant_guide.findByPk(id);
        },
        justBrilliantGuides: async (_root, _input, { user }) => {
            return await db.just_brilliant_guide.findAll();
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
