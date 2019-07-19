import db from "../models";
import {
    handleCreateActionActivityLog,
    handleUpdateActionActivityLog,
    asyncForEach,
    handleDeleteActionActivityLog
} from "../utils/constant";
import { rejects } from "assert";
import { UserInputError } from "apollo-server-express";

export default {
    Query: {
        role: async (root, { id }, { user }) => {
            //if user is not logged in
            if (!user) {
                throw new AuthenticationError("Unauthorized");
            }
            const role = await db.role.findByPk(id);
            // console.log(Object.keys(role.__proto__));
            return role;
        },

        roles: async (root, input, { user }) => {
            //if user is not logged in
            if (!user) {
                throw new AuthenticationError("Unauthorized");
            }
            return await db.role.findAll();
        },

        rolesByClientId: async (_root, { clientId }, { user }) => {
            //if user is not logged in
            if (!user) {
                throw new AuthenticationError("Unauthorized");
            }

            // let output_roles = [];

            // const departments = await db.department.findAll({
            //     include: [
            //         {
            //             model: db.client,
            //             where: { id: clientId }
            //         }
            //     ]
            // });

            // await asyncForEach(departments, async department => {
            //     console.log("Department ID: ", department.id);
            //     const roles = await db.role.findAll({
            //         where: { departmentId: department.id }
            //     });
            //     await asyncForEach(roles, async ({ id }) => {
            //         console.log("Role ID: ", id);
            //         const role = await db.role.findByPk(id);
            //         output_roles.push(role);
            //     });
            // });
            // return output_roles;

            return db.role.findAll({ where: { clientId } });
        }
    },
    Mutation: {
        createRole: async (
            _root,
            {
                input: {
                    name,
                    isStandardRole: is_standard_role,
                    permissionIds,
                    departmentId,
                    clientId
                }
            },
            { user, clientIp }
        ) => {
            console.log("1");

            //Check if departmentId exists
            const department = await db.department.findByPk(departmentId);
            if (!Boolean(department)) {
                throw new UserInputError(
                    `Department ID ${departmentId} does not exist.\nError Message: ${
                        error.message
                    }`
                );
            }
            console.log("2");

            //Check if clientId exists
            const client = await db.client.findByPk(clientId);
            if (!Boolean(client)) {
                throw new UserInputError(
                    `Client ID ${clientId} does not exist.\nError Message: ${
                        error.message
                    }`
                );
            }
            console.log("3");

            const role = db.role.build({
                name,
                is_standard_role,
                departmentId,
                clientId
            });

            try {
                await role.save();
            } catch (error) {
                throw new UserInputError(
                    `Create Role ${name} status failed.\nError Message: ${
                        error.message
                    }`
                );
            }
            console.log("4");

            //Create Activity Logging
            handleCreateActionActivityLog(
                role,
                { name, is_standard_role, departmentId, clientId },
                user,
                clientIp
            );

            //Check if the permissions inside permissionIds array exists
            for (const permissionId in permissionIds) {
                try {
                    await db.permission.findByPk(permissionId);
                } catch (error) {
                    throw new UserInputError(
                        `Permission ID ${permissionId} does not exist.\nError Message: ${
                            error.message
                        }`
                    );
                }
            }

            //Attempt to assign permissions to the role
            try {
                await role.setPermissions(permissionIds);
            } catch (error) {
                throw new UserInputError(
                    `Unable to assign selected permissions to role.\nError Message: ${
                        error.message
                    }`
                );
            }

            //Activity logging
            handleUpdateActionActivityLog(
                role,
                { permissions: `[${Array(permissionIds).toString()}]` },
                user,
                clientIp
            );

            return await db.role.findByPk(role.id);
        },
        updateRole: async (
            _root,
            { input: { id, name, permissionIds, departmentId } },
            { user, clientIp }
        ) => {
            //Check if deportment exists
            const role = await db.role.findByPk(id);
            if (!Boolean(role)) {
                throw new UserInputError(
                    `Role ID ${id} does not exist.\nError Message: ${
                        error.message
                    }`
                );
            }

            // console.log(Object.keys(role.__proto__));

            //Check if departmentId exists
            const department = await db.department.findByPk(departmentId);
            if (!Boolean(department)) {
                throw new UserInputError(
                    `Department ID ${departmentId} does not exist.\nError Message: ${
                        error.message
                    }`
                );
            }

            try {
                await role.update({
                    name,
                    departmentId
                });
            } catch (error) {
                throw new UserInputError(
                    `Update Role ID ${id} status failed.\nError Message: ${
                        error.message
                    }`
                );
            }

            //Check if the permissions inside permissionIds array exists
            for (const permissionId in permissionIds) {
                try {
                    await db.permission.findByPk(permissionId);
                } catch (error) {
                    throw new UserInputError(
                        `Permission ID ${permissionId} does not exist.\nError Message: ${
                            error.message
                        }`
                    );
                }
            }

            //Remove old permissions before assigning new permissions to the role
            try {
                await role.removePermissions(await role.getPermissions());
            } catch (error) {
                throw new UserInputError(
                    `Unable to delete all permissions to role.\nError Message: ${
                        error.message
                    }`
                );
            }

            //Attempt to assign permissions to the role
            try {
                await role.setPermissions(permissionIds);
            } catch (error) {
                throw new UserInputError(
                    `Unable to assign selected permissions to role.\nError Message: ${
                        error.message
                    }`
                );
            }

            //Activity logging
            handleUpdateActionActivityLog(
                role,
                {
                    name,
                    departmentId,
                    permissions: `[${Array(permissionIds).toString()}]`
                },
                user,
                clientIp
            );

            return await db.role.findByPk(id);
        },
        deleteRoles: async (
            _root,
            { input: { roleIds, clientId } },
            { user, clientIp }
        ) => {
            // console.log("Role IDs is ", roleIds);
            // console.log("Client ID is ", clientId);
            const client = await db.client.findByPk(clientId);
            if (!client) {
                throw new UserInputError(`Invalid Client ID: ${clientId}`);
            }
            // console.log(Object.keys(client.__proto__));

            // const roles = await client.getRoles();
            // console.log("Roles retrieved");

            // console.log(
            //     "creating roles array: ",
            //     roles.map(role => ({ id: role.id, name: role.name }))
            // );

            // console.log("next statement");

            await asyncForEach(roleIds, async roleId => {
                const role = await db.role.findByPk(roleId);
                if (!role) {
                    throw new UserInputError(`Invalid Role ID: ${roleId}`);
                }

                //For logging purposes
                const roleLog = {
                    id: role.id,
                    name: role.name,
                    is_standard_role: role.is_standard_role,
                    departmentId: role.departmentId,
                    clientId: clientId
                };

                //Get all permissions of the role
                const permissions = await role.getPermissions();

                //For logging purposes
                const originalRolePermissions = permissions.map(permission => ({
                    id: permission.id,
                    name: permission.name
                }));

                //So we can delete entries in the pivot table between role and permissions
                try {
                    //Delete relationship between role and permissions
                    await role.removePermissions(permissions);
                } catch (err) {
                    throw new UserInputError(
                        `Unable to delete permissions from role Id ${roleId}.\nError message: ${
                            err.message
                        }`
                    );
                }

                //Get all users attached to this role
                const users = await role.getUsers();

                //For logging purposes
                const originalRoleUsers = users.map(user => ({
                    id: user.name,
                    name: user.name,
                    email: user.email
                }));

                //So we can delete entries in the pivot table between user and role
                try {
                    //Delete relationship between role and user
                    await role.removeUsers(users);
                } catch (err) {
                    throw new UserInputError(
                        `Unable to delete users from role Id ${roleId}.\nError message: ${
                            err.message
                        }`
                    );
                }

                //Remove all relationship entries, so now we can actually delete the role for real
                //Delete relationship between selected directory entry from selected directory list
                try {
                    await db.role.destroy({
                        where: { id: roleId }
                    });
                } catch (err) {
                    throw new UserInputError(
                        `Unable to delete role Id ${roleId}.\nError message: ${
                            err.message
                        }`
                    );
                }

                handleDeleteActionActivityLog(
                    role,
                    {
                        role: { ...roleLog },
                        users: [...originalRoleUsers],
                        permissions: [...originalRolePermissions]
                    },
                    user,
                    clientIp
                );
            });

            return true;
        },
        duplicateRoles: async (
            _root,
            { input: { roleIds } },
            { user, clientIp }
        ) => {
            await asyncForEach(roleIds, async roleId => {
                const role = await db.role.findByPk(roleId);
                if (!role) {
                    throw new UserInputError(`Invalid Role ID: ${roleId}`);
                }
                const duplicateRole = db.role.build({
                    name: role.name + " (DUPLICATE)",
                    departmentId: role.departmentId,
                    clientId: role.clientId
                });

                //Try duplicating the array
                try {
                    await duplicateRole.save();
                } catch (error) {
                    throw new UserInputError(
                        `Unable to duplicate role Id ${roleId}.\nError message: ${
                            error.message
                        }`
                    );
                }

                //Get all permissions
                const permissions = await role.getPermissions();

                //For logging purposes
                const originalRolePermissions = permissions.map(permission => ({
                    id: permission.id,
                    name: permission.name
                }));

                //Try to assign same permissions to the duplicated permissions
                try {
                    await duplicateRole.setPermissions(permissions);
                } catch (error) {
                    throw new UserInputError(
                        `Unable to duplicate permissions for role ID ${
                            duplicateRole.id
                        }.\nError message: ${error.message}`
                    );
                }

                //Activity logging
                handleCreateActionActivityLog(
                    duplicateRole,
                    {
                        role: {
                            name: duplicateRole.name,
                            is_standard_role: duplicateRole.is_standard_role,
                            departmentId: duplicateRole.departmentId,
                            clientId: duplicateRole.clientId
                        },
                        permissions: [...originalRolePermissions]
                    },
                    user,
                    clientIp
                );
            });

            return true;
        },
        duplicateRole: async (
            _root,
            { id: roleId, name },
            { user, clientIp }
        ) => {
            const role = await db.role.findByPk(roleId);
            if (!role) {
                throw new UserInputError(`Invalid Role ID: ${roleId}`);
            }
            const duplicateRole = db.role.build({
                name,
                departmentId: role.departmentId,
                clientId: role.clientId
            });

            //Try duplicating the array
            try {
                await duplicateRole.save();
            } catch (error) {
                throw new UserInputError(
                    `Unable to duplicate role Id ${roleId}.\nError message: ${
                        error.message
                    }`
                );
            }

            //Get all permissions
            const permissions = await role.getPermissions();

            //For logging purposes
            const originalRolePermissions = permissions.map(permission => ({
                id: permission.id,
                name: permission.name
            }));

            //Try to assign same permissions to the duplicated permissions
            try {
                await duplicateRole.setPermissions(permissions);
            } catch (error) {
                throw new UserInputError(
                    `Unable to duplicate permissions for role ID ${
                        duplicateRole.id
                    }.\nError message: ${error.message}`
                );
            }

            //Activity logging
            handleCreateActionActivityLog(
                duplicateRole,
                {
                    role: {
                        name: duplicateRole.name,
                        is_standard_role: duplicateRole.is_standard_role,
                        departmentId: duplicateRole.departmentId,
                        clientId: duplicateRole.clientId
                    },
                    permissions: [...originalRolePermissions]
                },
                user,
                clientIp
            );

            return true;
        }
    },
    Role: {
        users: async role =>
            await db.user.findAll({
                include: [
                    {
                        model: db.role,
                        where: { id: role.id }
                    }
                ]
            }),
        permissions: async role => {
            return await db.permission.findAll({
                include: [
                    {
                        model: db.role,
                        where: { id: role.id }
                    }
                ]
            });
        },
        department: async role =>
            await db.department.findByPk(role.departmentId),
        client: async role =>
            Boolean(role.clientId)
                ? await db.client.findByPk(role.clientId)
                : null
    }
};
