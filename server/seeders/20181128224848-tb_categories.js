"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "tb_categories",
            [
                {
                    name: "IN-ROOM SERVICES",
                    has_directory: false
                },
                {
                    name: "HOTEL SERVICES",
                    has_directory: false
                },
                {
                    name: "DESTINATION VANUATU",
                    has_directory: false
                },
                {
                    name: "HOLIDAY INN RESORT PHOTO GALLERY",
                    has_directory: false
                },
                {
                    name: "IN-ROOM DINING",
                    has_directory: false,
                    tbCategoryId: 1
                },
                {
                    name: "SERVICES & FACILITIES",
                    has_directory: false,
                    tbCategoryId: 1
                },
                {
                    name: "PHONE DIRECTORY",
                    has_directory: false,
                    tbCategoryId: 1
                },
                {
                    name: "TV GUIDE",
                    has_directory: false,
                    tbCategoryId: 1
                },
                {
                    name: "HEALTH & SAFETY",
                    has_directory: false,
                    tbCategoryId: 1
                },
                {
                    name: "BREAKFAST",
                    has_directory: true,
                    tbCategoryId: 5
                },
                {
                    name: "LUNCH",
                    has_directory: true,
                    tbCategoryId: 5
                },
                {
                    name: "DINNER",
                    has_directory: true,
                    tbCategoryId: 5
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("tb_categories", null, {});
    }
};
