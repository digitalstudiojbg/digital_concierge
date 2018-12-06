import db from "../models";
import { AuthenticationError } from "apollo-server-express";
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

            return await db.user.findById(id);
        },
        users: async (root, input, { user }) => {
            await checkUserLogin(user);

            return await db.user.findAll();
        }
    },
    User: {
        role: async user => {
            return await db.role.findById(user.roleId);
        },

        venue: async user => {
            return await db.venue.findById(user.venueId);
        }
    }
};
