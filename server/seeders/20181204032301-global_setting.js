"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "global_settings",
            [
                {
                    name: "JBG Global Settings"
                },
                {
                    name: "HI Global Settings"
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("global_settings", null, {});
    }
};
