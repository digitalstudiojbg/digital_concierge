"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "tiers",
            [
                {
                    name: "IN-ROOM SERVICES",
                    is_parent: true
                },
                {
                    name: "HOTEL SERVICES",
                    is_parent: true
                },
                {
                    name: "DESTINATION VANUATU",
                    is_parent: true
                },
                {
                    name: "HOLIDAY INN RESORT PHOTO GALLERY",
                    is_parent: true
                },
                {
                    name: "IN-ROOM DINING",
                    tierId: 1,
                    is_parent: false
                },
                {
                    name: "SERVICES & FACILITIES",
                    tierId: 1,
                    is_parent: false
                },
                {
                    name: "PHONE DIRECTORY",
                    tierId: 1,
                    is_parent: false
                },
                {
                    name: "TV GUIDE",
                    tierId: 1,
                    is_parent: false
                },
                {
                    name: "HEALTH & SAFETY",
                    tierId: 1,
                    is_parent: false
                },
                {
                    name: "BREAKFAST",
                    tierId: 5,
                    is_parent: false
                },
                {
                    name: "LUNCH",
                    tierId: 5,
                    is_parent: false
                },
                {
                    name: "DINNER",
                    tierId: 5,
                    is_parent: false
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("tiers", null, {});
    }
};
