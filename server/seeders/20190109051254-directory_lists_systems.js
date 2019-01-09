"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "directory_lists_systems",
            [
                {
                    directoryListId: 1,
                    systemId: 1
                },
                {
                    directoryListId: 2,
                    systemId: 1
                },
                {
                    directoryListId: 3,
                    systemId: 1
                },
                {
                    directoryListId: 4,
                    systemId: 1
                },
                {
                    directoryListId: 5,
                    systemId: 1
                },
                {
                    directoryListId: 6,
                    systemId: 1
                },
                {
                    directoryListId: 7,
                    systemId: 1
                },
                {
                    directoryListId: 8,
                    systemId: 1
                },
                {
                    directoryListId: 9,
                    systemId: 1
                },
                {
                    directoryListId: 10,
                    systemId: 1
                },
                {
                    directoryListId: 11,
                    systemId: 1
                },
                {
                    directoryListId: 12,
                    systemId: 1
                },
                {
                    directoryListId: 1,
                    systemId: 2
                },
                {
                    directoryListId: 2,
                    systemId: 2
                },
                {
                    directoryListId: 3,
                    systemId: 2
                },
                {
                    directoryListId: 4,
                    systemId: 2
                },
                {
                    directoryListId: 5,
                    systemId: 2
                },
                {
                    directoryListId: 6,
                    systemId: 2
                },
                {
                    directoryListId: 7,
                    systemId: 2
                },
                {
                    directoryListId: 8,
                    systemId: 2
                },
                {
                    directoryListId: 9,
                    systemId: 2
                },
                {
                    directoryListId: 10,
                    systemId: 2
                },
                {
                    directoryListId: 11,
                    systemId: 2
                },
                {
                    directoryListId: 12,
                    systemId: 2
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("directory_lists_systems", null, {});
    }
};
