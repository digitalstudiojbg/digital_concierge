import db from "../models";

export default {
    Query: {
        contact: async (_root, { id }) => await db.contact.findByPk(id),
        contacts: async () => await db.contact.findAll(),
        contactsByUser: async (_root, _input, { user }) =>
            await db.contact.findAll({ where: { clientId: user.clientId } })
    },
    Contact: {
        client: async contact => await db.client.findByPk(contact.clientId)
    }
};
