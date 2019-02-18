import db from "../models";

export default {
    Query: {
        system: async (_root, { id }) => await db.system.findByPk(id),
        systems: async (_root, _input, { user }) => await db.system.findAll(),
        systemsByClient: async (_root, { id }) =>
            await db.system.findAll({ where: { clientId: id } }),
        systemsByUser: async (_root, _input, { user }) =>
            await db.system.findAll({ where: { clientId: user.clientId } })
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
