import db from "../models";

export default {
    Query: {
        department: async (_root, { id }) => {
            return await db.department.findByPk(id);
        },
        departments: async (_root, _input, { user }) => {
            return await db.department.findAll();
        }
    },
    Department: {
        clients: async department =>
            await db.client.findAll({
                include: [
                    {
                        model: db.department,
                        where: { id: department.id }
                    }
                ]
            }),
        roles: async department => {
            return await db.role.findAll({
                where: { departmentId: department.id }
            });
        }
    }
};
