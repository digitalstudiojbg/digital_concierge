import db from "../models";

export default {
    Query: {
        activityLog: async (_root, { id }) =>
            await db.activity_log.findByPk(id),
        activityLogs: async (_root, _input) => await db.activity_log.findAll()
    },
    Mutation: {
        createActivity: async (
            _root,
            {
                input: {
                    tableName,
                    modelName,
                    subjectId,
                    actionType,
                    properties
                }
            },
            { user, clientIp }
        ) => {
            const {
                country,
                region,
                city,
                latitude,
                longitude,
                ip_address: ip
            } = clientIp;
            let created_activity_log = db.activity_log.build({
                tableName,
                modelName,
                subjectId,
                actionType,
                properties,
                ip,
                country,
                region,
                city,
                latitude,
                longitude,
                userId: user.id
            });
            try {
                await created_activity_log.save();
            } catch (error) {
                throw new UserInputError(
                    `Create Activity Log for model ${modelName} with ID: ${subjectId} status failed.\nError Message: ${
                        error.message
                    }`
                );
            }
            return created_activity_log;
        }
    },
    ActivityLog: {
        user: async activityLog => await db.user.findByPk(activityLog.userId),
        properties_raw: async activityLog => activityLog.properties,
        properties: async activityLog => JSON.parse(activityLog.properties)
    }
};
