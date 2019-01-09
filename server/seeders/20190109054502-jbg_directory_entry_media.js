"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "jbg_directory_entries_media",
            [
                {
                    jbgDirectoryEntryId: 1,
                    mediumId: 2
                },
                {
                    jbgDirectoryEntryId: 2,
                    mediumId: 1
                },
                {
                    jbgDirectoryEntryId: 3,
                    mediumId: 2
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
