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
    MEDIA: {
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
        }
    }
};
