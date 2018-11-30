import db from "../models";

export default {
    Query: {
        validation: async (root, { id }, { user }) => {
            //if user is not logged in
            /*if (!user) {
                throw new AuthenticationError("Unauthorized");
            }*/
            return await db.validation.findById(id);
        },

        validations: async (root, input, { user }) => {
            //if user is not logged in
            /*if (!user) {
                throw new AuthenticationError("Unauthorized");
            }*/
            return await db.validation.findAll();
        }
    },
    Validation: {
        td_directory_types: async validation => {
            return await db.tb_directory_type.findAll({
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
