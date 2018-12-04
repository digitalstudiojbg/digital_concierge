"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "global_settings",
            [
                {
                    name: "JBG Global Settings",
                    venueId: 1
                },
                {
                    name: "HI Global Settings",
                    venueId: 2
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("global_settings", null, {});
    }
};
