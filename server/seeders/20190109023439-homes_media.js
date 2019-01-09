"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "homes_media",
            [
                {
                    homeId: 1,
                    mediumId: 1
                },
                {
                    homeId: 2,
                    mediumId: 2
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("homes_media", null, {});
    }
};
