import db from "../models";
import {
    handleCreateActionActivityLog,
    handleUpdateActionActivityLog,
    asyncForEach
} from "../utils/constant";
import { rejects } from "assert";

export default {
    Query: {
        role: async (root, { id }, { user }) => {
            //if user is not logged in
            if (!user) {
                throw new AuthenticationError("Unauthorized");
            }
            return await db.role.findByPk(id);
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

            let output_roles = [];

            const departments = await db.department.findAll({
                include: [
                    {
                        model: db.client,
                        where: { id: clientId }
                    }
                ]
            });

            await asyncForEach(departments, async department => {
                console.log("Department ID: ", department.id);
                const roles = await db.role.findAll({
                    where: { departmentId: department.id }
                });
                await asyncForEach(roles, async ({ id }) => {
                    console.log("Role ID: ", id);
                    const role = await db.role.findByPk(id);
                    output_roles.push(role);
                });
            });
            return output_roles;

            // new Promise(async (resolve, reject) => {
            //     asyncForEach(departments, async department => {
            //         const singleDepartmentRoleList = await department.getRoles();
            //         console.log(Object.keys(department.__proto__));

            //         /* const roles = db.role.findAll({
            //             where: { departmentId: department.id }
            //         });
            //         asyncForEach(roles, async ({ id }) => {
            //             console.log("Role ID: ", id);
            //             const role = await db.role.findByPk(id);
            //             output_roles.push(role);
            //         });*/
            //     });
            //     resolve();
            // }).then(() => {
            //     return output_roles;
            // });
            // for (const department in departments) {
            //     const deptRoles = await db.role.findAll({
            //         where: { departmentId: department.id }
            //     });
            //     for (const role in deptRoles) {
            //         console.log("Role ", role);
            //         roles.push(role);
            //     }
            // }
            // // roles = [].concat.apply([], roles);
            // console.log("roles ", roles);

            // await asyncForEach(departments, async department => {
            //     // console.log(Object.keys(department.__proto__));
            //     console.log("Department ID: ", department.id);
            //     // const departmentRoles = await db.role.findAll({
            //     //     where: { departmentId: department.id }
            //     // });

            //     await new Promise(async resolve => {
            //         const departmentRoles = await db.role.findAll({
            //             where: { departmentId: department.id }
            //         });
            //         resolve(departmentRoles);
            //     }).then(departmentRoles => {
            //         department_roles.push(departmentRoles);
            //     });
            // });

            // console.log(department_roles);

            // await asyncForEach(department_roles, async roles => {});
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
                    departmentId
                }
            },
            { user, clientIp }
        ) => {
            //Check if departmentId exists
            const department = await db.department.findByPk(departmentId);
            if (!Boolean(department)) {
                throw new UserInputError(
                    `Department ID ${departmentId} does not exist.\nError Message: ${
                        error.message
                    }`
                );
            }

            const role = db.role.build({
                name,
                is_standard_role,
                departmentId
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

            //Create Activity Logging
            handleCreateActionActivityLog(
                role,
                { name, is_standard_role, departmentId },
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
                role.setPermissions(permissionIds);
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

            // //Attempt to assign permissions to the role
            try {
                role.setPermissions(permissionIds);
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
            await db.department.findByPk(role.departmentId)
    }
};
