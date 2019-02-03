import db from "../models";
import {
    handleCreateActionActivityLog,
    handleUpdateActionActivityLog
} from "../utils/constant";

export default {
    Query: {
        department: async (_root, { id }) => {
            return await db.department.findByPk(id);
        },
        departments: async (_root, _input, { user }) => {
            return await db.department.findAll();
        },
        departmentsByUser: async (_root, _input, { user }) =>
            await db.department.findAll({
                include: [
                    {
                        model: db.client,
                        where: { id: user.clientId }
                    }
                ]
            })
    },
    Mutation: {
        createDepartment: async (
            _root,
            { input: { name } },
            { user, clientIp }
        ) => {
            const department = db.department.build({ name });

            try {
                await department.save();
            } catch (error) {
                throw new UserInputError(
                    `Create Department ${name} status failed.\nError Message: ${
                        error.message
                    }`
                );
            }

            await handleCreateActionActivityLog(
                department,
                { name },
                user,
                clientIp
            );

            //Assign client and department relationship
            const client = await db.client.findByPk(user.clientId);

            try {
                await client.addDepartment(department);
            } catch (error) {
                throw new UserInputError(
                    `Assign Department ${name} to Client ${name} status failed.\nError Message: ${
                        error.message
                    }`
                );
            }

            await handleUpdateActionActivityLog(
                client,
                { relationship_change: `Assign ${department.id}` },
                user,
                clientIp
            );

            return department;
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
