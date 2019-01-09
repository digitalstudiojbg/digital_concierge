"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "jbg_directory_lists_just_brilliant_guides",
            [
                {
                    jbgDirectoryListId: 1,
                    justBrilliantGuideId: 1
                },
                {
                    jbgDirectoryListId: 1,
                    justBrilliantGuideId: 2
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(
            "jbg_directory_lists_just_brilliant_guides",
            null,
            {}
        );
    }
};
