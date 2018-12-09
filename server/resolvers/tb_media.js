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
        }
    }
};
