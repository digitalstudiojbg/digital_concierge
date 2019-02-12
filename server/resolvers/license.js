import db from "../models";
import { log } from "util";

export default {
    Query: {
        license: async (_root, { id }) => await db.license.findByPk(id),
        licenses: async () => await db.license.findAll()
    },
    Mutation: {
        createLicense: async (
            _root,
            {
                input: {
                    key,
                    license_type_id: licenseTypeId,
                    commence_date,
                    expire_date,
                    auto_renewal,
                    clientId
                }
            },
            { user, clientIp }
        ) => {
            console.log("--------------------");

            console.log(key);
            console.log(licenseTypeId);
            console.log(commence_date);
            console.log(expire_date);
            console.log(auto_renewal);

            console.log(new Date(commence_date));
            console.log(new Date(expire_date));

            let created_license = db.license.build({
                key,
                licenseTypeId,
                commence_date: new Date(commence_date),
                expire_date: new Date(expire_date),
                auto_renewal,
                clientId
            });

            console.log(created_license);

            return await created_license.save();
        }
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
