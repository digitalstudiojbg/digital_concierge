import db from "../models";

export default {
    Query: {
        permissionCategory: async (_root, { id }, { user }) => {
            //if user is not logged in
            if (!user) {
                throw new AuthenticationError("Unauthorized");
            }
            return await db.permission_category.findByPk(id);
        },

        permissionCategories: async (_root, _input, { user }) => {
            //if user is not logged in
            if (!user) {
                throw new AuthenticationError("Unauthorized");
            }

            return await db.permission_category.findAll();
        }
    },
    PermissionCategory: {
        permissions: async pc =>
            await db.permission.findAll({
                where: { permissionCategoryId: pc.id }
            })
    }
};
