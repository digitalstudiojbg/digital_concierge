"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "devices",
            [
                {
                    number: "JBG TOUCH SCREEN #1",
                    roomId: 1,
                    clientId: 2,
                    systemId: 1
                },

                {
                    number: "JBG TABLET #1",
                    roomId: 2,
                    clientId: 2,
                    systemId: 2
                },
                {
                    number: "JBG TABLET #1",
                    roomId: 3,
                    clientId: 2,
                    systemId: 2
                },
                {
                    number: "HOLIDAY INN TOUCH SCREEN #1",
                    roomId: 4,
                    clientId: 1,
                    systemId: 3
                },
                {
                    number: "HOLIDAY INN TABLET #1",
                    roomId: 5,
                    clientId: 1,
                    systemId: 4
                },
                {
                    number: "HOLIDAY INN TABLET #2",
                    roomId: 6,
                    clientId: 1,
                    systemId: 4
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("devices", null, {});
    }
};
