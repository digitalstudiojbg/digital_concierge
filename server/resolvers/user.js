import db from "../models";
import { checkUserLogin } from "../utils/constant";

export default {
    Query: {
        getCurrentUser: async (root, input, { user }) => {
            //if user is not logged in
            await checkUserLogin(user);

            return user;
        },
        user: async (root, { id }, { user }) => {
            await checkUserLogin(user);

            //if user does not have "admin" permission
            /*if (user.role !== "admin") {
                throw new AuthenticationError("Unauthorized");
            }*/

            return await db.user.findByPk(id);
        },
        users: async (root, input, { user }) => {
            await checkUserLogin(user);

            return await db.user.findAll();
        }
    },
    User: {
        roles: async user =>
            await db.role.findAll({
                include: [
                    {
                        model: db.user,
                        where: { id: user.id }
                    }
                ]
            }),
        client: async user => {
            return await db.client.findById(user.clientId);
        }
    }
};
