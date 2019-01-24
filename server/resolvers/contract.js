import db from "../models";

export default {
    Query: {
        contract: async (_root, { id }) => await db.contract.findByPk(id),
        contracts: async () => await db.contract.findAll(),
        contractsByUser: async (_root, _input, { user }) =>
            await db.contract.findAll({ where: { clientId: user.clientId } })
    },
    Contract: {
        client: async contract => await db.client.findByPk(contract.clientId)
    }
};
