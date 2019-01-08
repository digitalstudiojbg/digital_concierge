import db from "../models";

export default {
    Query: {
        role: async (root, { id }, { user }) => {
            //if user is not logged in
            if (!user) {
                throw new AuthenticationError("Unauthorized");
            }
            return await db.role.findByPk(id);
        },

        roles: async (root, input, { user }) => {
            //if user is not logged in
            if (!user) {
                throw new AuthenticationError("Unauthorized");
            }
            return await db.role.findAll();
        }
    },
    Role: {
        users: async role => {
            return await db.user.findAll({
                where: {
                    roleId: role.id
                }
            });
        },
        permissions: async role => {
            return await db.permission.findAll({
                include: [
                    {
                        model: db.role,
                        where: { id: role.id }
                    }
                ]
            });
        }
    }
};
