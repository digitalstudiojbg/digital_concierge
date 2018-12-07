"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface
            .bulkInsert(
                "ad_categories",
                [
                    {
                        name: "DESTINATION VANUATU"
                    },
                    {
                        name: "DESTINATION MILDURA"
                    }
                ],
                {}
            )
            .then(() => {
                queryInterface.bulkInsert(
                    "ad_categories",
                    [
                        {
                            name: "ACTIVITIES",
                            adCategoryId: 1,
                            is_parent: false
                        },
                        {
                            name: "EVENTS",
                            adCategoryId: 1,
                            is_parent: false
                        },
                        {
                            name: "TREKKING",
                            adCategoryId: 3,
                            is_parent: false
                        },
                        {
                            name: "DIVING",
                            adCategoryId: 3,
                            is_parent: false
                        },
                        {
                            name: "FISHING",
                            adCategoryId: 3,
                            is_parent: false
                        },
                        {
                            name: "JUNE",
                            adCategoryId: 4,
                            is_parent: false
                        },
                        {
                            name: "AUGUST",
                            adCategoryId: 4,
                            is_parent: false
                        },
                        {
                            name: "SEPTEMBER",
                            adCategoryId: 4,
                            is_parent: false
                        }
                    ],
                    {}
                );
            });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("ad_categories", null, {});
    }
};
