"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "tb_categories_venues",
            [
                {
                    venueId: 1,
                    tbCategoryId: 1
                },
                {
                    venueId: 1,
                    tbCategoryId: 2
                },
                {
                    venueId: 1,
                    tbCategoryId: 3
                },
                {
                    venueId: 1,
                    tbCategoryId: 4
                },
                {
                    venueId: 1,
                    tbCategoryId: 5
                },
                {
                    venueId: 1,
                    tbCategoryId: 6
                },
                {
                    venueId: 1,
                    tbCategoryId: 7
                },
                {
                    venueId: 1,
                    tbCategoryId: 8
                },
                {
                    venueId: 1,
                    tbCategoryId: 9
                },
                {
                    venueId: 1,
                    tbCategoryId: 10
                },
                {
                    venueId: 1,
                    tbCategoryId: 11
                },
                {
                    venueId: 1,
                    tbCategoryId: 12
                },
                {
                    venueId: 2,
                    tbCategoryId: 10
                },
                {
                    venueId: 2,
                    tbCategoryId: 11
                },
                {
                    venueId: 2,
                    tbCategoryId: 12
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("tb_directories_venues", null, {});
    }
};
