import db from "../models";
import { AuthenticationError } from "apollo-server-express";

export default {
    Query: {
        getCurrentUser: async (root, input, { user }) => {
            //if user is not logged in
            if (!user) {
                throw new AuthenticationError("Unauthorized");
            }

            return user;
        },
        user: async (root, { id }, { user }) => {
            //if user is not logged in
            if (!user) {
                throw new AuthenticationError("Unauthorized");
            }

            //if user does not have "admin" permission
            /*if (user.role !== "admin") {
                throw new AuthenticationError("Unauthorized");
            }*/

            return await db.user.findById(id);
        },
        users: async (root, input, { user }) => {
            //if user is not logged in
            if (!user) {
                throw new AuthenticationError("Unauthorized");
            }

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
