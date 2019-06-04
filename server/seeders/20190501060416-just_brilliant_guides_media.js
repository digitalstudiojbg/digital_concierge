"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "just_brilliant_guides_media",
            [
                {
                    justBrilliantGuideId: 1,
                    mediumId: 37
                },
                {
                    justBrilliantGuideId: 2,
                    mediumId: 38
                },
                {
                    justBrilliantGuideId: 3,
                    mediumId: 39
                },
                {
                    justBrilliantGuideId: 4,
                    mediumId: 40
                },
                {
                    justBrilliantGuideId: 5,
                    mediumId: 41
                },
                {
                    justBrilliantGuideId: 6,
                    mediumId: 42
                },
                {
                    justBrilliantGuideId: 7,
                    mediumId: 43
                },
                {
                    justBrilliantGuideId: 8,
                    mediumId: 44
                },
                {
                    justBrilliantGuideId: 9,
                    mediumId: 45
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(
            "jbg_directory_entries_media",
            null,
            {}
        );
    }
};
