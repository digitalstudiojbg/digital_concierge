"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "tb_categories_venues",
            [
                {
                    venueId: 1,
                    tbCategoryId: 1,
                    is_parent: true
                },
                {
                    venueId: 1,
                    tbCategoryId: 2,
                    is_parent: true
                },
                {
                    venueId: 1,
                    tbCategoryId: 3,
                    is_parent: true
                },
                {
                    venueId: 1,
                    tbCategoryId: 4,
                    is_parent: true
                },
                {
                    venueId: 1,
                    tbCategoryId: 5,
                    is_parent: false
                },
                {
                    venueId: 1,
                    tbCategoryId: 6,
                    is_parent: false
                },
                {
                    venueId: 1,
                    tbCategoryId: 7,
                    is_parent: false
                },
                {
                    venueId: 1,
                    tbCategoryId: 8,
                    is_parent: false
                },
                {
                    venueId: 1,
                    tbCategoryId: 9,
                    is_parent: false
                },
                {
                    venueId: 1,
                    tbCategoryId: 10,
                    is_parent: false
                },
                {
                    venueId: 1,
                    tbCategoryId: 11,
                    is_parent: false
                },
                {
                    venueId: 1,
                    tbCategoryId: 12,
                    is_parent: false
                },
                {
                    venueId: 2,
                    tbCategoryId: 10,
                    is_parent: false
                },
                {
                    venueId: 2,
                    tbCategoryId: 11,
                    is_parent: false
                },
                {
                    venueId: 2,
                    tbCategoryId: 12,
                    is_parent: false
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("tb_directories_venues", null, {});
    }
};
