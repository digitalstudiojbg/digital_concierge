"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "rooms",
            [
                {
                    name: "JBG LOBBY",
                    clientId: 2
                },

                {
                    name: "JBG ROOM 1",
                    clientId: 2
                },
                {
                    name: "JBG ROOM 2",
                    clientId: 2
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
