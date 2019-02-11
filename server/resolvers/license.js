import db from "../models";

export default {
    Query: {
        license: async (_root, { id }) => await db.license.findByPk(id),
        licenses: async () => await db.license.findAll()
    },
    License: {
        licenseType: async license => {
            return await db.license_type.findByPk(license.licenseTypeId);
        },
        client: async license => {
            return await db.client.findByPk(license.clientId);
        }
    }
};
