import db from "../models";
import { UserInputError, ApolloError } from "apollo-server-express";
import {
    handleCreateActionActivityLog,
    handleDeleteActionActivityLog,
    handleUpdateActionActivityLog
} from "../utils/constant";

export default {
    Query: {
        system: async (_root, { id }) => {
            const system = await db.system.findByPk(id);
            console.log(Object.keys(system.__proto__));
            return system;
        },
        systems: async (_root, _input, { user }) => await db.system.findAll(),
        systemsByClient: async (_root, { id }) =>
            await db.system.findAll({ where: { clientId: id } }),
        systemsByUser: async (_root, _input, { user }) =>
            await db.system.findAll({ where: { clientId: user.clientId } })
    },
    Mutation: {
        createSystem: async (
            _root,
            {
                input: {
                    name,
                    aif,
                    numberOfDevices,
                    deviceTypeId,
                    featureIds,
                    systemTypeId,
                    clientId
                }
            },
            { user, clientIp }
        ) => {
            const tempSystem = {
                name,
                aif,
                numberOfDevices,
                deviceTypeId,
                systemTypeId,
                clientId
            };
            try {
                let created_system = db.system.build({
                    ...tempSystem
                });
                await created_system.save();
                await created_system.addFeatures(featureIds);
                handleCreateActionActivityLog(
                    created_system,
                    { ...tempSystem, features: [...featureIds] },
                    user,
                    clientIp
                );
                return created_system;
            } catch (error) {
                throw new UserInputError(
                    `Create system ${name} status failed.\nError Message: ${
                        error.message
                    }`
                );
            }
        },
        editSystem: async (
            _root,
            {
                input: {
                    id,
                    name,
                    aif,
                    numberOfDevices,
                    deviceTypeId,
                    featureIds,
                    systemTypeId
                }
            },
            user,
            clientIp
        ) => {
            let system = await db.system.findByPk(id);
            if (!system) {
                throw new UserInputError(`Unable to find system ID ${id}.`);
            } else {
                const tempSystem = {
                    name,
                    aif,
                    numberOfDevices,
                    deviceTypeId,
                    systemTypeId
                };
                try {
                    await system.update({ ...tempSystem });
                    await system.setFeatures(featureIds);
                    handleUpdateActionActivityLog(
                        system,
                        { ...tempSystem, features: [...featureIds] },
                        user,
                        clientIp
                    );
                    return system;
                } catch (error) {
                    throw new UserInputError(
                        `Unable to update system ID ${id} with ${name}.\nError Message: ${
                            error.message
                        }`,
                        500
                    );
                }
            }
        },
        deleteSystem: async (_root, { id }, user, clientIp) => {
            const systemRaw = await db.system.findOne({
                where: { id },
                raw: true
            });
            const system = await db.system.findByPk(id);
            if (!system) {
                throw new UserInputError(`Unable to find system ID ${id}.`);
            } else {
                const featureIds = await db.feature
                    .findAll({
                        include: [
                            {
                                model: db.system,
                                where: { id: system.id }
                            }
                        ]
                    })
                    .map(({ id }) => id);
                try {
                    //Remove feature and system pivot entries
                    await system.removeFeatures(featureIds);
                } catch (error) {
                    throw new UserInputError(
                        `Unable to remove all feature ids of system ID ${id}.\nError Message: ${
                            error.message
                        }`,
                        500
                    );
                }
                const tempSystem = {
                    ...systemRaw,
                    features: featureIds.slice()
                };
                try {
                    //Remove actual system from database;
                    await db.system.destroy({ where: { id } });
                } catch (error) {
                    throw new UserInputError(
                        `Unable to destroy system ID ${id}.\nError Message: ${
                            error.message
                        }`,
                        500
                    );
                }
                handleDeleteActionActivityLog(
                    system,
                    tempSystem,
                    user,
                    clientIp
                );
                return system;
            }
        }
    },

    System: {
        client: async system => await db.client.findByPk(system.clientId),
        devices: async system =>
            await db.device.findAll({ where: { systemId: system.id } }),
        just_brilliant_guide: async system =>
            await db.just_brilliant_guide.findByPk(system.justBrilliantGuideId),
        layouts: async system =>
            await db.layout.findAll({
                include: [
                    {
                        model: db.system,
                        where: { id: system.id }
                    }
                ]
            }),
        start: async system => await db.start.findByPk(system.startId),
        home: async system => await db.home.findByPk(system.homeId),
        galleries: async system =>
            await db.gallery.findAll({
                include: [
                    {
                        model: db.system,
                        where: { id: system.id }
                    }
                ]
            }),
        maps: async system =>
            await db.map.findAll({
                include: [
                    {
                        model: db.system,
                        where: { id: system.id }
                    }
                ]
            }),
        directory_lists: async system =>
            await db.directory_list.findAll({
                include: [
                    {
                        model: db.system,
                        where: { id: system.id }
                    }
                ]
            }),
        media: async system =>
            await db.media.findAll({
                include: [
                    {
                        model: db.system,
                        where: { id: system.id }
                    }
                ]
            }),
        theme: async system =>
            await db.theme.findOne({ where: { systemId: system.id } }),
        device_type: async system =>
            await db.device_type.findByPk(system.deviceTypeId),
        system_type: async system =>
            await db.system_type.findByPk(system.systemTypeId),
        features: async system =>
            await db.feature.findAll({
                include: [
                    {
                        model: db.system,
                        where: { id: system.id }
                    }
                ]
            }),
        devices_count: async system =>
            db.device.count({ where: { systemId: system.id } })
    }
};
