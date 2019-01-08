import db from "../models";

export default {
    Query: {
        device: async (_root, { id }) => {
            return await db.device.findByPk(id);
        },
        devices: async (_root, _input, { user }) => {
            return await db.device.findAll();
        }
    },
    Device: {
        client: async device => {
            return await db.client.findByPk(device.clientId);
        },
        room: async device => {
            return await db.room.findByPk(device.roomId);
        },
        system: async device => {
            return await db.system.findByPk(device.systemId);
        }
    }
};
