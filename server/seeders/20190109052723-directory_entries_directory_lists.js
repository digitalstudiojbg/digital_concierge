"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "directory_entries_directory_lists",
            [
                {
                    directoryEntryId: 1,
                    directoryListId: 6
                },
                {
                    directoryEntryId: 2,
                    directoryListId: 6
                },
                {
                    directoryEntryId: 3,
                    directoryListId: 10
                },
                {
                    directoryEntryId: 4,
                    directoryListId: 11
                },
                {
                    directoryEntryId: 5,
                    directoryListId: 10
                },
                {
                    directoryEntryId: 3,
                    directoryListId: 12
                },
                {
                    directoryEntryId: 4,
                    directoryListId: 10
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(
            "directory_entries_directory_lists",
            null,
            {}
        );
    }
};
