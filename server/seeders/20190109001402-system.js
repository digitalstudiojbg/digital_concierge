"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "systems",
            [
                {
                    name: "JOHN BATMAN GROUP TABLET SYSTEM",
                    numberOfDevices: 100,
                    clientId: 2,
                    startId: 1,
                    homeId: 1,
                    justBrilliantGuideId: 1,
                    deviceTypeId: 1,
                    systemTypeId: 1
                },
                {
                    name: "JOHN BATMAN GROUP TOUCH SCREEN SYSTEM",
                    numberOfDevices: 2,
                    clientId: 2,
                    startId: 1,
                    homeId: 1,
                    justBrilliantGuideId: 1,
                    deviceTypeId: 2,
                    systemTypeId: 2
                },
                {
                    name: "HOLIDAY INN VANUATU TABLET SYSTEM",
                    numberOfDevices: 100,
                    clientId: 1,
                    startId: 2,
                    homeId: 2,
                    justBrilliantGuideId: 2,
                    deviceTypeId: 1,
                    systemTypeId: 1
                },
                {
                    name: "HOLIDAY INN VANUATU TOUCH SCREEN SYSTEM",
                    numberOfDevices: 10,
                    clientId: 1,
                    startId: 2,
                    homeId: 2,
                    justBrilliantGuideId: 2,
                    deviceTypeId: 2,
                    systemTypeId: 2
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("systems", null, {});
    }
};
