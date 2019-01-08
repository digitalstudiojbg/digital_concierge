import db from "../models";

export default {
    Query: {
        guest: async (_root, { id }) => {
            return await db.guest.findByPk(id);
        },
        guests: async (_root, _input, { user }) => {
            return await db.guest.findAll();
        }
    },
    Guest: {
        client: async guest => {
            return await db.client.findByPk(guest.clientId);
        },
        rooms: async guest => {
            return await db.room.findAll({
                include: [
                    {
                        model: db.guest,
                        where: { id: guest.id }
                    }
                ]
            });
        }
    }
};
