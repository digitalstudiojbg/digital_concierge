import db from "../models";

export default {
    Query: {
        media: async (root, { id }, { user }) => {
            return await db.media.findById(id);
        },

        medias: async (root, input, { user }) => {
            return await db.media.findAll();
        }
    },
    Media: {
        venue: async media => {
            return await db.venue.findById(media.venueId);
        },
        ad_directories: async media => {
            return await db.ad_directory.findAll({
                include: [
                    {
                        model: db.media,
                        where: { id: media.id }
                    }
                ]
            });
        },
        ad_categories: async media => {
            return await db.ad_category.findAll({
                include: [
                    {
                        model: db.media,
                        where: { id: media.id }
                    }
                ]
            });
        },
        directories: async media => {
            return await db.directory.findAll({
                include: [
                    {
                        model: db.media,
                        where: { id: media.id }
                    }
                ]
            });
        },
        tiers: async media => {
            return await db.tier.findAll({
                include: [
                    {
                        model: db.media,
                        where: { id: media.id }
                    }
                ]
            });
        }
    }
};
