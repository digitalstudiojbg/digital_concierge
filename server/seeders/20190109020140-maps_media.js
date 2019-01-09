"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "maps_media",
            [
                {
                    mapId: 1,
                    mediumId: 1
                },
                {
                    mapId: 2,
                    mediumId: 1
                },
                {
                    mapId: 3,
                    mediumId: 1
                },
                {
                    mapId: 4,
                    mediumId: 1
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("maps_media", null, {});
    }
};
