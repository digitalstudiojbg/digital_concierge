"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "ad_directories",
            [
                {
                    name: "ADVERTISEMENT 1",
                    adDirectoryTypeId: 1
                },
                {
                    name: "ADVERTISEMENT 2",
                    adDirectoryTypeId: 1
                },
                {
                    name: "ADVERTISEMENT 3",
                    adDirectoryTypeId: 2
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("ad_directories", null, {});
    }
};
