"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface
            .bulkInsert(
                "tb_directories_tb_categories",
                [
                    {
                        tbDirectoryId: 1,
                        tbCategoryId: 6
                    },
                    {
                        tbDirectoryId: 2,
                        tbCategoryId: 6
                    },
                    {
                        tbDirectoryId: 3,
                        tbCategoryId: 10
                    },
                    {
                        tbDirectoryId: 4,
                        tbCategoryId: 11
                    }
                ],
                {}
            )
            .then(() => {
                queryInterface.bulkInsert(
                    "tb_directories_tb_categories",
                    [
                        {
                            tbDirectoryId: 3,
                            tbCategoryId: 12,
                            active: false
                        },
                        {
                            tbDirectoryId: 4,
                            tbCategoryId: 10,
                            active: false
                        }
                    ],
                    {}
                );
            });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(
            "tb_directories_tb_categories",
            null,
            {}
        );
    }
};
