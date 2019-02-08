import db from "../models";

export default {
    Query: {
        deviceType: async (_root, { id }) => {
            return await db.device_type.findByPk(id);
        },
        deviceTypes: async () => {
            return await db.device_type.findAll();
        }
    },
    DeviceType: {
        systems: async ({ id }) =>
            await db.system.findAll({ where: { deviceTypeId: id } })
    }
};
