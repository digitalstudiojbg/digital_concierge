"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "directory_lists_media",
            [
                {
                    directoryListId: 1,
                    mediumId: 1
                },
                {
                    directoryListId: 2,
                    mediumId: 1
                },
                {
                    directoryListId: 3,
                    mediumId: 1
                },
                {
                    directoryListId: 4,
                    mediumId: 1
                },
                {
                    directoryListId: 5,
                    mediumId: 1
                },
                {
                    directoryListId: 6,
                    mediumId: 1
                },
                {
                    directoryListId: 7,
                    mediumId: 1
                },
                {
                    directoryListId: 8,
                    mediumId: 1
                },
                {
                    directoryListId: 9,
                    mediumId: 1
                },
                {
                    directoryListId: 10,
                    mediumId: 1
                },
                {
                    directoryListId: 11,
                    mediumId: 1
                },
                {
                    directoryListId: 12,
                    mediumId: 1
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("directory_lists_media", null, {});
    }
};
