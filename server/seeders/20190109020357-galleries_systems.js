"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "galleries_systems",
            [
                {
                    galleryId: 1,
                    systemId: 1
                },
                {
                    galleryId: 1,
                    systemId: 2
                },
                {
                    galleryId: 2,
                    systemId: 2
                },
                {
                    galleryId: 3,
                    systemId: 3
                },
                {
                    galleryId: 4,
                    systemId: 4
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("galleries_systems", null, {});
    }
};
