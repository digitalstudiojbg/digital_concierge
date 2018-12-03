"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "tb_categories",
            [
                {
                    name: "IN-ROOM SERVICES",
                    has_directory: false,
                    tbDirectoryTypeId: 1
                },
                {
                    name: "HOTEL SERVICES",
                    has_directory: false,
                    tbDirectoryTypeId: 1
                },
                {
                    name: "DESTINATION VANUATU",
                    has_directory: false,
                    tbDirectoryTypeId: 1
                },
                {
                    name: "HOLIDAY INN RESORT PHOTO GALLERY",
                    has_directory: false,
                    tbDirectoryTypeId: 1
                },
                {
                    name: "IN-ROOM DINING",
                    has_directory: false,
                    tbCategoryId: 1,
                    tbDirectoryTypeId: 2
                },
                {
                    name: "SERVICES & FACILITIES",
                    has_directory: false,
                    tbCategoryId: 1,
                    tbDirectoryTypeId: 2
                },
                {
                    name: "PHONE DIRECTORY",
                    has_directory: false,
                    tbCategoryId: 1,
                    tbDirectoryTypeId: 2
                },
                {
                    name: "TV GUIDE",
                    has_directory: false,
                    tbCategoryId: 1,
                    tbDirectoryTypeId: 2
                },
                {
                    name: "HEALTH & SAFETY",
                    has_directory: false,
                    tbCategoryId: 1,
                    tbDirectoryTypeId: 2
                },
                {
                    name: "BREAKFAST",
                    has_directory: true,
                    tbCategoryId: 5,
                    tbDirectoryTypeId: 3
                },
                {
                    name: "LUNCH",
                    has_directory: true,
                    tbCategoryId: 5,
                    tbDirectoryTypeId: 3
                },
                {
                    name: "DINNER",
                    has_directory: true,
                    tbCategoryId: 5,
                    tbDirectoryTypeId: 3
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("tb_categories", null, {});
    }
};
