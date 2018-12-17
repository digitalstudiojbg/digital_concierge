import db from "../models";

export default {
    Query: {
        validation: async (root, { id }, { user }) => {
            return await db.validation.findById(id);
        },

        validations: async (root, input, { user }) => {
            return await db.validation.findAll();
        }
    },
    Validation: {
        content_layouts: async validation => {
            return await db.content_layout.findAll({
                include: [
                    {
                        model: db.validation,
                        where: { id: validation.id }
                    }
                ]
            });
        }
    }
};
