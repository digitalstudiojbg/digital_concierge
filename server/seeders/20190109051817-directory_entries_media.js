"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "directory_entries_media",
            [
                {
                    directoryEntryId: 1,
                    mediumId: 1
                },
                {
                    directoryEntryId: 2,
                    mediumId: 1
                },
                {
                    directoryEntryId: 3,
                    mediumId: 1
                },
                {
                    directoryEntryId: 4,
                    mediumId: 1
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("directory_entries_media", null, {});
    }
};
