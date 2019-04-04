"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "templates",
            [
                {
                    name: "ROOM FEATURE TEMPLATE",
                    templateTypeId: 4
                },
                {
                    name: "ROOM SERVICE TEMPLATE",
                    templateTypeId: 4
                },
                {
                    name: "VENUE RESTAURANT TEMPLATE",
                    templateTypeId: 4
                },
                {
                    name: "VENUE ACTIVITY TEMPLATE",
                    templateTypeId: 4
                },
                {
                    name: "DIRECTORY LIST GENERAL INFORMATION",
                    templateTypeId: 3
                },
                {
                    name: "DIRECTORY LIST GENERAL INFORMATION #2",
                    templateTypeId: 3
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("templates", null, {});
    }
};
