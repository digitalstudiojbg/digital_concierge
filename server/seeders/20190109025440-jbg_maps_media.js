"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "jbg_maps_media",
            [
                {
                    jbgMapId: 1,
                    mediumId: 1
                },
                {
                    jbgMapId: 2,
                    mediumId: 1
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("jbg_maps_media", null, {});
    }
};
