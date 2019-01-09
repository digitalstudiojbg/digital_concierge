"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "jbg_welcomes_media",
            [
                {
                    jbgWelcomeId: 1,
                    mediumId: 1
                },
                {
                    jbgWelcomeId: 2,
                    mediumId: 1
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("jbg_welcomes_media", null, {});
    }
};
