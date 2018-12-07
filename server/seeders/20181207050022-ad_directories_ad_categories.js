"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "ad_directories_ad_categories",
            [
                {
                    adDirectoryId: 1,
                    adCategoryId: 1
                },
                {
                    adDirectoryId: 1,
                    adCategoryId: 2
                },
                {
                    adDirectoryId: 2,
                    adCategoryId: 1
                },
                {
                    adDirectoryId: 2,
                    adCategoryId: 2
                },
                {
                    adDirectoryId: 3,
                    adCategoryId: 2
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(
            "ad_directories_ad_categories",
            null,
            {}
        );
    }
};
