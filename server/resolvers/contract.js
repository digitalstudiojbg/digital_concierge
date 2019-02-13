import db from "../models";
import {
    processUploadMedia,
    processUpload,
    processDelete
} from "../utils/constant";

export default {
    Query: {
        contract: async (_root, { id }) => await db.contract.findByPk(id),
        contracts: async () => await db.contract.findAll(),
        contractsByUser: async (_root, _input, { user }) =>
            await db.contract.findAll({ where: { clientId: user.clientId } })
    },
    Mutation: {
        createContract: async (
            _root,
            { input: { number, agreement_date, renewal_date, clientId, file } },
            { user, clientIp }
        ) => {
            let contract_file;
            if (file) {
                contract_file = await processUploadMedia(file, user.id, "file");
            }

            let created_contract = db.contract.build({
                number,
                agreement_date: new Date(agreement_date),
                renewal_date: new Date(renewal_date),
                file: "http://www.google.com.au",
                clientId
            });

            return await created_contract.save();
        }
    },
    Contract: {
        client: async contract => await db.client.findByPk(contract.clientId)
    }
};
