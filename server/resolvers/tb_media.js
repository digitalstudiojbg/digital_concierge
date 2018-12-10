import db from "../models";

export default {
    Query: {
        tb_media: async (root, { id }, { user }) => {
            return await db.tb_media.findById(id);
        },

        tb_medias: async (root, input, { user }) => {
            return await db.tb_media.findAll();
        }
    },
    TB_MEDIA: {
        venue: async tb_media => {
            return await db.venue.findById(tb_media.venueId);
        },
        tb_directories: async tb_media => {
            return await db.tb_directory.findAll({
                include: [
                    {
                        model: db.tb_media,
                        where: { id: tb_media.id }
                    }
                ]
            });
        },
        tb_landing_pages: async tb_media => {
            return await db.tb_landing_page.findAll({
                include: [
                    {
                        model: db.tb_media,
                        where: { id: tb_media.id }
                    }
                ]
            });
        },
        tb_categories: async tb_media => {
            return await db.tb_category.findAll({
                include: [
                    {
                        model: db.tb_media,
                        where: { id: tb_media.id }
                    }
                ]
            });
        },
        ad_directories: async tb_media => {
            return await db.ad_directory.findAll({
                include: [
                    {
                        model: db.tb_media,
                        where: { id: tb_media.id }
                    }
                ]
            });
        },
    }
};
