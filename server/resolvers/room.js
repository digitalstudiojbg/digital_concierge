import db from "../models";

export default {
    Query: {
        room: async (_root, { id }, { user }) => {
            return await db.room.findById(id);
        },
        rooms: async (_root, _input, { user }) => {
            return await db.room.findAll();
        },
        rooms_by_venue: async (_root, { id }, { user }) => {
            return await db.room.findAll({
                where: {
                    venueId: id
                }
            });
        }
    },
    Room: {
        guests: async room => {
            return await db.guest.findAll({
                include: [
                    {
                        model: db.room,
                        where: { id: room.id }
                    }
                ]
            });
        },

        venue: async room => {
            return await db.venue.findById(room.venueId);
        }
    }
};
