"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "jbg_directory_lists_media",
            [
                {
                    jbgDirectoryListId: 1,
                    mediumId: 2
                },
                {
                    jbgDirectoryListId: 2,
                    mediumId: 1
                },
                {
                    jbgDirectoryListId: 3,
                    mediumId: 2
                },
                {
                    jbgDirectoryListId: 4,
                    mediumId: 2
                },
                {
                    jbgDirectoryListId: 5,
                    mediumId: 2
                },
                {
                    jbgDirectoryListId: 6,
                    mediumId: 2
                },
                {
                    jbgDirectoryListId: 7,
                    mediumId: 2
                },
                {
                    jbgDirectoryListId: 8,
                    mediumId: 2
                },
                {
                    jbgDirectoryListId: 9,
                    mediumId: 2
                },
                {
                    jbgDirectoryListId: 10,
                    mediumId: 2
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("jbg_directory_lists_media", null, {});
    }
};
