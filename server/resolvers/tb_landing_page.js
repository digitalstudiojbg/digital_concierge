import db from "../models";

export default {
    Query: {
        tb_landing_page: async (root, { id }, { user }) => {
            return await db.tb_landing_page.findById(id);
        },
        tb_landing_pages: async (root, input, { user }) => {
            return await db.tb_landing_page.findAll();
        }
    },
    TB_LANDING_PAGE: {
        tb_directory_type: async tb_landing_page => {
            return await db.tb_directory_type.findById(
                tb_landing_page.tbDirectoryTypeId
            );
        },
        venue: async tb_landing_page => {
            return await db.venue.findById(tb_landing_page.venueId);
        }
    }
};
