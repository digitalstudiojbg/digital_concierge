"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "media_starts",
            [
                {
                    startId: 1,
                    mediumId: 1
                },
                {
                    startId: 2,
                    mediumId: 2
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("media_starts", null, {});
    }
};
