import db from "../models";

export default {
    Query: {
        contact: async (_root, { id }) => await db.contact.findByPk(id),
        contacts: async () => await db.contact.findAll(),
        contactsByUser: async (_root, _input, { user }) =>
            await db.contact.findAll({ where: { clientId: user.clientId } })
    },
    Mutation: {
        createContact: async (
            _root,
            { input: { name, title, phone, mobile, email, clientId } },
            { user, clientIp }
        ) => {
            let create_contact = db.contact.build({
                name,
                title,
                phone,
                mobile,
                email,
                clientId
            });

            await create_contact.save();

            return create_contact;
        }
    },
    Contact: {
        client: async contact => await db.client.findByPk(contact.clientId)
    }
};
