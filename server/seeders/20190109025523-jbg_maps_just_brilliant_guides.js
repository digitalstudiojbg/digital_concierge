"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "jbg_maps_just_brilliant_guides",
            [
                {
                    jbgMapId: 1,
                    justBrilliantGuideId: 1
                },
                {
                    jbgMapId: 2,
                    justBrilliantGuideId: 2
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(
            "jbg_maps_just_brilliant_guides",
            null,
            {}
        );
    }
};
