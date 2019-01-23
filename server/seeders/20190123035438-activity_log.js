"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "activity_logs",
            [
                {
                    tableName: "layouts",
                    modelName: "layout",
                    subjectId: 1,
                    actionType: "UPDATE",
                    properties:
                        "{\"name\": \"From 'TEST LAYOUT' to 'GENERAL LAYOUT'\"}",
                    ip: "49.199.29.4",
                    country: "Australia",
                    region: "VIC",
                    city: "Melbourne",
                    userId: 1
                },
                {
                    tableName: "layouts",
                    modelName: "layout",
                    subjectId: 2,
                    actionType: "UPDATE",
                    properties:
                        "{\"name\": \"From 'TEST LAYOUT #1' to 'LAYOUT #1'\"}",
                    ip: "49.199.29.4",
                    country: "Australia",
                    region: "VIC",
                    city: "Melbourne",
                    userId: 2
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("activity_logs", null, {});
    }
};
