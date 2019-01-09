"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "maps_systems",
            [
                {
                    mapId: 1,
                    systemId: 1
                },
                {
                    mapId: 1,
                    systemId: 2
                },
                {
                    mapId: 2,
                    systemId: 2
                },
                {
                    mapId: 3,
                    systemId: 3
                },
                {
                    mapId: 4,
                    systemId: 4
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("maps_systems", null, {});
    }
};
