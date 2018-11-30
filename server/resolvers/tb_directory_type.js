import db from "../models";

export default {
    Query: {
        tb_directory_type: async (root, { id }, { user }) => {
            //if user is not logged in
            /*if (!user) {
                throw new AuthenticationError("Unauthorized");
            }*/
            return await db.tb_directory_type.findById(id);
        },

        tb_directory_types: async (root, input, { user }) => {
            //if user is not logged in
            /*if (!user) {
                throw new AuthenticationError("Unauthorized");
            }*/
            return await db.tb_directory_type.findAll();
        }
    },
    TB_Directory_Type: {
        validations: async tb_directory_type => {
            return await db.validation.findAll({
                include: [
                    {
                        model: db.tb_directory_type,
                        where: { id: tb_directory_type.id }
                    }
                ]
            });
        }
    }
};
