"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "rooms",
            [
                {
                    name: "SAMPLE LOBBY",
                    clientId: 3
                },

                {
                    name: "SAMPLE ROOM 1",
                    clientId: 3
                },
                {
                    name: "SAMPLE ROOM 2",
                    clientId: 3
                },
                {
                    name: "HOLIDAY INN LOBBY",
                    clientId: 1
                },
                {
                    name: "HOLIDAY INN ROOM 1",
                    clientId: 1
                },
                {
                    name: "HOLIDAY INN ROOM 2",
                    clientId: 1
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("rooms", null, {});
    }
};
