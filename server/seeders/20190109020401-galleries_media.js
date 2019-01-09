"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "galleries_media",
            [
                {
                    galleryId: 1,
                    mediumId: 1
                },
                {
                    galleryId: 2,
                    mediumId: 1
                },
                {
                    galleryId: 2,
                    mediumId: 2
                },
                {
                    galleryId: 3,
                    mediumId: 2
                },
                {
                    galleryId: 4,
                    mediumId: 2
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("galleries_media", null, {});
    }
};
