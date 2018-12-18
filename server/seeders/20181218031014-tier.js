"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "tiers",
            [
                {
                    name: "IN-ROOM SERVICES",
                    is_parent: true,
                    contentLayoutId: 6
                },
                {
                    name: "HOTEL SERVICES",
                    is_parent: true,
                    contentLayoutId: 6
                },
                {
                    name: "DESTINATION VANUATU",
                    is_parent: true,
                    contentLayoutId: 6
                },
                {
                    name: "HOLIDAY INN RESORT PHOTO GALLERY",
                    is_parent: true,
                    contentLayoutId: 6
                },
                {
                    name: "IN-ROOM DINING",
                    tierId: 1,
                    is_parent: false,
                    contentLayoutId: 6
                },
                {
                    name: "SERVICES & FACILITIES",
                    tierId: 1,
                    is_parent: false,
                    contentLayoutId: 6
                },
                {
                    name: "PHONE DIRECTORY",
                    tierId: 1,
                    is_parent: false,
                    contentLayoutId: 6
                },
                {
                    name: "TV GUIDE",
                    tierId: 1,
                    is_parent: false,
                    contentLayoutId: 6
                },
                {
                    name: "HEALTH & SAFETY",
                    tierId: 1,
                    is_parent: false,
                    contentLayoutId: 6
                },
                {
                    name: "BREAKFAST",
                    tierId: 5,
                    is_parent: false,
                    contentLayoutId: 6
                },
                {
                    name: "LUNCH",
                    tierId: 5,
                    is_parent: false,
                    contentLayoutId: 6
                },
                {
                    name: "DINNER",
                    tierId: 5,
                    is_parent: false,
                    contentLayoutId: 6
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("tiers", null, {});
    }
};
