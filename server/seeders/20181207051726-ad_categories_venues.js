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
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("ad_categories_venues", null, {});
    }
};
