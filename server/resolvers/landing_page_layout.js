import db from "../models";

export default {
    Query: {
        landing_page_layout: async (root, { id }, { user }) => {
            return await db.landing_page_layout.findById(id);
        },

        landing_page_layouts: async (oot, input, { user }) => {
            return await db.landing_page_layout.findAll();
        }
    },
    Landing_Page_Layout: {
        validations: async landing_page_layout => {
            return await db.validation.findAll({
                include: [
                    {
                        model: db.landing_page_layout,
                        where: { id: landing_page_layout.id }
                    }
                ]
            });
        }
    }
};
