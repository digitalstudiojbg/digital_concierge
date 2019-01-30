import db from "../models";

export default {
    Query: {
        client: async (_root, { id }) => {
            return await db.client.findByPk(id);
        },
        clients: async (_root, _input, { user }) => {
            return await db.client.findAll();
        },
        clientByUser: async (_root, _input, { user }) =>
            await db.client.findByPk(user.clientId)
    },
    Client: {
        users: async client =>
            await db.user.findAll({ where: { clientId: client.id } }),
        departments: async client =>
            await db.department.findAll({
                include: [
                    {
                        model: db.client,
                        where: { id: client.id }
                    }
                ]
            }),
        guests: async client =>
            await db.guest.findAll({ where: { clientId: client.id } }),
        rooms: async client =>
            await db.room.findAll({ where: { clientId: client.id } }),
        systems: async client =>
            await db.system.findAll({ where: { clientId: client.id } }),
        media: async client =>
            await db.media.findAll({ where: { clientId: client.id } }),
        devices: async client =>
            await db.device.findAll({ where: { clientId: client.id } }),
        contacts: async client =>
            await db.contact.findAll({ where: { clientId: client.id } }),
        active_contract: async client => {
            const contracts = await db.contract.findAll({
                where: { clientId: client.id, active: true },
                order: [["createdAt", "DESC"]]
            });
            return contracts.length > 0 ? contracts[0] : null;
        },
        contracts: async client =>
            await db.contract.findAll({ where: { clientId: client.id } }),
        venue_state: async client =>
            await db.state.findByPk(client.venueStateId),
        postal_state: async client =>
            await db.state.findByPk(client.postalStateId)
    }
};
