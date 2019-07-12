import db from "../models";
import {
    handleCreateActionActivityLog,
    handleUpdateActionActivityLog
} from "../utils/constant";
import { UserInputError } from "apollo-server-express";

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
            }),
        departmentsByClient: async (_root, { id }) =>
            await db.department.findAll({
                include: [
                    {
                        model: db.client,
                        where: { id: id }
                    }
                ]
            })
    },
    Mutation: {
        createDepartment: async (
            _root,
            { input: { name, clientId } },
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
            const client = await db.client.findByPk(clientId);

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
        },
        updateDepartment: async (
            _root,
            { input: { id, name } },
            { user, clientIp }
        ) => {
            const department = await db.department.findByPk(id);
            if (!department) {
                throw new UserInputError(`Invalid Department ID`);
            }
            try {
                const update_department = await db.department.findByPk(id);
                await update_department.update({ name }, { fields: ["name"] });
                handleUpdateActionActivityLog(
                    department,
                    { name },
                    user,
                    clientIp
                );
                return update_department;
            } catch (error) {
                throw new UserInputError(error.message);
            }
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
