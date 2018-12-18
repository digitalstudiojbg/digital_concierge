"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "rooms",
            [
                {
                    name: "001",
                    venueId: 2
                },
                {
                    name: "002",
                    venueId: 2
                },
                {
                    name: "005",
                    venueId: 2
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("rooms", null, {});
    }
};
