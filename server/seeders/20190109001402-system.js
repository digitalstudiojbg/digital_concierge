"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "systems",
            [
                {
                    name: "JOHN BATMAN GROUP TABLET SYSTEM",
                    clientId: 2,
                    startId: 1,
                    homeId: 1,
                    justBrilliantGuideId: 1
                },
                {
                    name: "JOHN BATMAN GROUP TOUCH SCREEN SYSTEM",
                    clientId: 2,
                    startId: 1,
                    homeId: 1,
                    justBrilliantGuideId: 1
                },
                {
                    name: "HOLIDAY INN VANUATU TABLET SYSTEM",
                    clientId: 1,
                    startId: 2,
                    homeId: 2,
                    justBrilliantGuideId: 2
                },
                {
                    name: "HOLIDAY INN VANUATU TOUCH SCREEN SYSTEM",
                    clientId: 1,
                    startId: 2,
                    homeId: 2,
                    justBrilliantGuideId: 2
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("systems", null, {});
    }
};
