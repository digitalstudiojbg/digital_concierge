import db from "../models";

export default {
    Query: {
        venue: async (root, { id }, { user }) => {
            return await db.venue.findById(id);
        },
        venues: async (root, input, { user }) => {
            //if user is not logged in
            if (!user) {
                throw new AuthenticationError("Unauthorized");
            }

            return await db.venue.findAll();
        }
    },
    Venue: {
        users: async venue => {
            return await db.user.findAll({
                where: {
                    venueId: venue.id
                }
            });
        },
        roles: async venue => {
            return await db.role.findAll({
                include: [
                    {
                        model: db.venue,
                        where: { id: venue.id }
                    }
                ]
            });
        }
    }
};
