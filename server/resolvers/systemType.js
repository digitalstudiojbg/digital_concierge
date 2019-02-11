import db from "../models";

export default {
    Query: {
        systemType: async (_root, { id }) => {
            return await db.system_type.findByPk(id);
        },
        systemTypes: async () => {
            return await db.system_type.findAll();
        }
    },
    SystemType: {
        systems: async ({ id }) =>
            await db.system.findAll({ where: { systemTypeId: id } })
    }
};
