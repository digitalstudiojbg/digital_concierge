"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "media_systems",
            [
                {
                    systemId: 1,
                    mediumId: 2
                },
                {
                    systemId: 2,
                    mediumId: 2
                },
                {
                    systemId: 3,
                    mediumId: 1
                },
                {
                    systemId: 4,
                    mediumId: 2
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("media_systems", null, {});
    }
};
