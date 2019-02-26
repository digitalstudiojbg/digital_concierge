import db from "../models";
import {
    checkUserLogin,
    asyncForEach,
    handleUpdateActionActivityLog
} from "../utils/constant";
import { log } from "util";
const bcrypt = require("bcrypt");
import { UserInputError } from "apollo-server-express";
const saltRounds = 10;
export default {
    Query: {
        getCurrentUser: async (root, input, { user }) => {
            //if user is not logged in
            await checkUserLogin(user);

            return user;
        },
        user: async (root, { id }, { user }) => {
            await checkUserLogin(user);

            //if user does not have "admin" permission
            /*if (user.role !== "admin") {
                throw new AuthenticationError("Unauthorized");
            }*/

            return await db.user.findByPk(id);
        },
        users: async (root, input, { user }) => {
            await checkUserLogin(user);

            return await db.user.findAll();
        }
    },
    Mutation: {
        createUser: async (
            _root,
            {
                input: {
                    name,
                    email,
                    password,
                    first_phone_number,
                    second_phone_number,
                    position,
                    clientId,
                    roleId
                }
            },
            { user, clientIp }
        ) => {
            const hash_password = bcrypt.hashSync(password, saltRounds);

            let create_user = db.user.build({
                name,
                email,
                password: hash_password,
                first_phone_number,
                second_phone_number,
                position,
                clientId,
                active: true,
                mediumId: 1
            });

            await create_user.save();

            roleId && (await create_user.addRole(roleId));
            //console.log(Object.keys(create_user.__proto__));

            return create_user;
        },
        deleteUsers: async (
            _root,
            { input: { id: idList } },
            { user, clientIp }
        ) => {
            let output = [];
            await asyncForEach(idList, async id => {
                try {
                    let selected_user = await db.user.findByPk(id);
                    output.push(selected_user);
                    await selected_user.removeRoles(
                        await selected_user.getRoles()
                    );

                    await db.user.destroy({
                        where: { id }
                    });
                } catch (error) {
                    throw new UserInputError(
                        `Unable to delete User ${id}.\nError Message: ${
                            error.message
                        }`
                    );
                }
            });

            return output;
        },
        updateUser: async (
            _root,
            {
                input: {
                    id,
                    name,
                    email,
                    password,
                    first_phone_number,
                    second_phone_number,
                    position,
                    role_id = null
                }
            },
            { user, clientIp }
        ) => {
            //https://stackoverflow.com/questions/47892127/succinct-concise-syntax-for-optional-object-keys-in-es6-es7
            const updatedUser = {
                name,
                email,
                position,
                ...(Boolean(password) && {
                    password: bcrypt.hashSync(password, saltRounds)
                }),
                ...(Boolean(first_phone_number) && {
                    first_phone_number
                }),
                ...(Boolean(second_phone_number) && {
                    second_phone_number
                })
            };

            const userToUpdate = await db.user.findByPk(id);

            if (Boolean(role_id)) {
                await userToUpdate.setRoles([role_id]);
            }

            try {
                await userToUpdate.update({
                    ...updatedUser
                });
            } catch (error) {
                throw new UserInputError(
                    `Unable to update User ${id}.\nError Message: ${
                        error.message
                    }`
                );
            }

            //Console logging changes
            handleUpdateActionActivityLog(userToUpdate, {}, user, clientIp);

            return await db.user.findByPk(id);
        }
    },
    User: {
        roles: async user =>
            await db.role.findAll({
                include: [
                    {
                        model: db.user,
                        where: { id: user.id }
                    }
                ]
            }),
        client: async user => {
            return await db.client.findByPk(user.clientId);
        },
        avatar: async user => (await db.media.findByPk(user.mediumId)).path
    }
};
