import db from "../models";

export default {
    Query: {
        group: async (_root, { id }) => {
            return await db.group.findByPk(id);
        },
        groups: async (_root, _input, { user }) => {
            return await db.group.findAll();
        }
    },
    Group: {
        client: async group => {
            return await db.client.findByPk(group.clientId);
        },
        roles: async group => {
            return await db.role.findAll({ where: { groupId: group.id } });
        }
    }
};
