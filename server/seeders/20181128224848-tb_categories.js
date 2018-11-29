"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "tb_categories",
            [
                {
                    name: "IN-ROOM SERVICES",
                    has_directory: false,
                    is_parent: true
                },
                {
                    name: "HOTEL SERVICES",
                    has_directory: false,
                    is_parent: true
                },
                {
                    name: "DESTINATION VANUATU",
                    has_directory: false,
                    is_parent: true
                },
                {
                    name: "HOLIDAY INN RESORT PHOTO GALLERY",
                    has_directory: false,
                    is_parent: true
                },
                {
                    name: "IN-ROOM DINING",
                    has_directory: false,
                    tbCategoryId: 1,
                    is_parent: false
                },
                {
                    name: "SERVICES",
                    has_directory: false,
                    tbCategoryId: 1,
                    is_parent: false
                },
                {
                    name: "PHONE DIRECTORY",
                    has_directory: false,
                    tbCategoryId: 1,
                    is_parent: false
                },
                {
                    name: "TV GUIDE",
                    has_directory: false,
                    tbCategoryId: 1,
                    is_parent: false
                },
                {
                    name: "HEALTH & SAFETY",
                    has_directory: false,
                    tbCategoryId: 1,
                    is_parent: false
                },
                {
                    name: "BREAKFAST",
                    has_directory: true,
                    tbCategoryId: 5,
                    is_parent: false
                },
                {
                    name: "LUNCH",
                    has_directory: true,
                    tbCategoryId: 5,
                    is_parent: false
                },
                {
                    name: "DINNER",
                    has_directory: true,
                    tbCategoryId: 5,
                    is_parent: false
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("tb_categories", null, {});
    }
};
