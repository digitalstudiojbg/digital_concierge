"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "ad_categories_venues",
            [
                {
                    venueId: 1,
                    adCategoryId: 1
                },
                {
                    venueId: 1,
                    adCategoryId: 2
                },
                {
                    venueId: 2,
                    adCategoryId: 1
                },
                {
                    venueId: 2,
                    adCategoryId: 2
                },

                {
                    venueId: 1,
                    adCategoryId: 3
                },
                {
                    venueId: 1,
                    adCategoryId: 4
                },
                {
                    venueId: 1,
                    adCategoryId: 5
                },
                {
                    venueId: 1,
                    adCategoryId: 6
                },
                {
                    venueId: 1,
                    adCategoryId: 7
                },
                {
                    venueId: 1,
                    adCategoryId: 8
                },
                {
                    venueId: 1,
                    adCategoryId: 9
                },
                {
                    venueId: 1,
                    adCategoryId: 10
                },

                {
                    venueId: 2,
                    adCategoryId: 3
                },
                {
                    venueId: 2,
                    adCategoryId: 4
                },
                {
                    venueId: 2,
                    adCategoryId: 5
                },
                {
                    venueId: 2,
                    adCategoryId: 6
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("ad_categories_venues", null, {});
    }
};
