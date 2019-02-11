import db from "../models";

export default {
    Query: {
        licenseType: async (_root, { id }) =>
            await db.license_type.findByPk(id),
        licenseTypes: async () => await db.license_type.findAll()
    },
    State: {}
};
