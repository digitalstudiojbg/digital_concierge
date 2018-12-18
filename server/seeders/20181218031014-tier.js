"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "tiers",
            [
                {
                    name: "IN-ROOM SERVICES",
                    is_parent: true,
                    tierLayoutId: 1
                },
                {
                    name: "HOTEL SERVICES",
                    is_parent: true,
                    tierLayoutId: 1
                },
                {
                    name: "DESTINATION VANUATU",
                    is_parent: true,
                    tierLayoutId: 1
                },
                {
                    name: "HOLIDAY INN RESORT PHOTO GALLERY",
                    is_parent: true,
                    tierLayoutId: 1
                },
                {
                    name: "IN-ROOM DINING",
                    tierId: 1,
                    is_parent: false,
                    tierLayoutId: 1
                },
                {
                    name: "SERVICES & FACILITIES",
                    tierId: 1,
                    is_parent: false,
                    tierLayoutId: 1
                },
                {
                    name: "PHONE DIRECTORY",
                    tierId: 1,
                    is_parent: false,
                    tierLayoutId: 1
                },
                {
                    name: "TV GUIDE",
                    tierId: 1,
                    is_parent: false,
                    tierLayoutId: 1
                },
                {
                    name: "HEALTH & SAFETY",
                    tierId: 1,
                    is_parent: false,
                    tierLayoutId: 1
                },
                {
                    name: "BREAKFAST",
                    tierId: 5,
                    is_parent: false,
                    tierLayoutId: 1
                },
                {
                    name: "LUNCH",
                    tierId: 5,
                    is_parent: false,
                    tierLayoutId: 1
                },
                {
                    name: "DINNER",
                    tierId: 5,
                    is_parent: false,
                    tierLayoutId: 1
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("tiers", null, {});
    }
};
