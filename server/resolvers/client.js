import db from "../models";

export default {
    Query: {
        client: async (_root, { id }) => {
            return await db.client.findByPk(id);
        },
        clients: async (_root, _input, { user }) => {
            return await db.client.findAll();
        }
    },
    Client: {
        users: async client =>
            await db.user.findAll({ where: { clientId: client.id } }),
        groups: async client =>
            await db.group.findAll({ where: { clientId: client.id } }),

        guests: async client =>
            await db.guest.findAll({ where: { clientId: client.id } }),
        rooms: async client =>
            await db.room.findAll({ where: { clientId: client.id } }),
        systems: async client =>
            await db.system.findAll({ where: { clientId: client.id } }),
        media: async client => {
            return await db.media.findAll({ where: { clientId: client.id } });
        },
        devices: async client =>
            await db.device.findAll({ where: { clientId: client.id } })
    }
};
