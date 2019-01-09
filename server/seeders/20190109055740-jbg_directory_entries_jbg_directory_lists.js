"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "jbg_directory_entries_jbg_directory_lists",
            [
                {
                    jbgDirectoryEntryId: 1,
                    jbgDirectoryListId: 1
                },
                {
                    jbgDirectoryEntryId: 1,
                    jbgDirectoryListId: 2
                },
                {
                    jbgDirectoryEntryId: 2,
                    jbgDirectoryListId: 1
                },
                {
                    jbgDirectoryEntryId: 2,
                    jbgDirectoryListId: 2
                },
                {
                    jbgDirectoryEntryId: 3,
                    jbgDirectoryListId: 2
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(
            "jbg_directory_entries_jbg_directory_lists",
            null,
            {}
        );
    }
};
