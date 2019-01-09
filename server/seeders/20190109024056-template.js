"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "templates",
            [
                {
                    name: "ROOM FEATURE TEMPLATE"
                },
                {
                    name: "ROOM SERVICE TEMPLATE"
                },
                {
                    name: "VENUE RESTAURANT TEMPLATE"
                },
                {
                    name: "VENUE ACTIVITY TEMPLATE"
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("templates", null, {});
    }
};
