import db from "../models";
import {
    handleCreateActionActivityLog,
    handleUpdateActionActivityLog,
    handleDeleteActionActivityLog
} from "../utils/constant";
import { UserInputError } from "apollo-server-express";

export default {
    Query: {
        department: async (_root, { id }) => {
            const department = await db.department.findByPk(id);
            // console.log(Object.keys(department.__proto__));
            return department;
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
            // console.log("Name is ", name);
            // console.log("Client ID is ", clientId);
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
        },
        deleteDepartment: async (
            _root,
            { id, clientId },
            { user, clientIp }
        ) => {
            const department = await db.department.findByPk(id);
            if (!department) {
                throw new UserInputError(`Invalid Department ID`);
            }

            const roles = await db.role.findAll({
                where: { departmentId: id, clientId }
            });
            if (Array.isArray(roles) && roles.length > 0) {
                //If there is still more roles
                throw new UserInputError(
                    `Please delete associated users and roles before deleting this department`
                );
            }

            try {
                //If Department is reused across different clients, cannot actually delete department, just remove entry in clients_department table (pivot)
                const client = await db.client.findByPk(clientId);
                if (!client) {
                    throw new UserInputError(`Invalid Client ID`);
                }
                await department.removeClient(client);
                if (!department.is_standard_department) {
                    //Not a standard department, can safely delete this department
                    await db.department.destroy({
                        where: { id }
                    });
                }
            } catch (error) {
                throw new UserInputError(
                    `Unable to delete Department ${id}.\nError Message: ${
                        error.message
                    }`
                );
            }

            handleDeleteActionActivityLog(
                department,
                { id, name: department.name },
                user,
                clientIp
            );
            return department;
        },
        duplicateDepartment: async (
            _root,
            { input: { id, name, clientId } },
            { user, clientIp }
        ) => {
            const client = await db.client.findByPk(clientId);
            if (!client) {
                throw new UserInputError(`Invalid Client ID`);
            }
            const department = await db.department.findByPk(id);
            if (!department) {
                throw new UserInputError(`Invalid Department ID`);
            }

            //Try creating a new duplicate department
            let duplicate_department = db.department.build({ name });
            try {
                await duplicate_department.save();
            } catch (error) {
                throw new UserInputError(
                    `Duplicate Department ${name} status failed.\nError Message: ${
                        error.message
                    }`
                );
            }

            await handleCreateActionActivityLog(
                duplicate_department,
                { name },
                user,
                clientIp
            );

            //Assign client and department relationship
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

            //Try duplicating roles and privileges
            const roles = await db.role.findAll({
                where: { departmentId: id, clientId },
                raw: true
            });
            if (Array.isArray(roles) && roles.length > 0) {
                for await (const { id: originalRoleId, name } of roles) {
                    let newRole = db.role.build({
                        name,
                        departmentId: duplicate_department.id,
                        clientId
                    });
                    try {
                        await newRole.save();
                    } catch (error) {
                        `Duplicate Role ID ${originalRoleId} with ${name} failed.\nError Message: ${
                            error.message
                        }`;
                    }

                    handleCreateActionActivityLog(
                        newRole,
                        {
                            name,
                            is_standard_role: false,
                            departmentId: duplicate_department.id,
                            clientId
                        },
                        user,
                        clientIp
                    );

                    //Assign same permissions to the new duplicated role
                    const permissions = await db.permission.findAll({
                        include: [
                            {
                                model: db.role,
                                where: { id: originalRoleId }
                            }
                        ]
                    });

                    //Attempt to assign permissions to the role
                    try {
                        await newRole.setPermissions(permissions);
                    } catch (error) {
                        throw new UserInputError(
                            `Unable to assign selected permissions to role ${
                                newRole.id
                            }.\nError Message: ${error.message}`
                        );
                    }

                    handleUpdateActionActivityLog(
                        newRole,
                        {
                            permissions: `[${Array(
                                permissions.map(({ id }) => id)
                            ).toString()}]`
                        },
                        user,
                        clientIp
                    );
                }
            }
            return duplicate_department;
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
        roles: async (department, { clientId }) => {
            return await db.role.findAll({
                where: { departmentId: department.id, clientId }
            });
        },
        rolesAll: async department => {
            return await db.role.findAll({
                where: { departmentId: department.id }
            });
        }
    }
};
