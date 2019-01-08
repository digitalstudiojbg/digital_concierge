import db from "../models";

export default {
    Query: {
        room: async (_root, { id }) => {
            return await db.guest.findByPk(id);
        },
        rooms: async (_root, _input, { user }) => {
            return await db.guest.findAll();
        }
    },
    Room: {
        guests: async room =>
            await db.guest.findAll({
                include: [
                    {
                        model: db.room,
                        where: { id: room.id }
                    }
                ]
            }),
        client: async room => await db.client.findByPk(room.clientId),
        device: async room =>
            await db.device.findOne({ where: { roomId: room.id } })
    }
};
