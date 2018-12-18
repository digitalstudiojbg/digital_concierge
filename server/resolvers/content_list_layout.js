import db from "../models";

export default {
    Query: {
        content_list_layout: async (root, { id }, { user }) => {
            return await db.content_list_layout.findById(id);
        },

        content_list_layouts: async (oot, input, { user }) => {
            return await db.content_list_layout.findAll();
        }
    },
    Content_List_Layout: {
        validations: async content_list_layout => {
            return await db.validation.findAll({
                include: [
                    {
                        model: db.content_list_layout,
                        where: { id: content_list_layout.id }
                    }
                ]
            });
        }
    }
};
