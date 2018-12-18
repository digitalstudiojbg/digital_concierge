import db from "../models";

export default {
    Query: {
        guest: async (_root, { id }, { user }) => {
            return await db.guest.findById(id);
        },
        guests: async (_root, _input, { user }) => {
            return await db.guest.findAll();
        }
    },
    Guest: {
        rooms: async guest => {
            return await db.room.findAll({
                include: [
                    {
                        model: db.guest,
                        where: { id: guest.id }
                    }
                ]
            });
        },

        venue: async guest => {
            return await db.venue.findById(guest.venueId);
        }
    }
};
