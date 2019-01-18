"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "directory_lists",
            [
                {
                    name: "IN-ROOM SERVICES",
                    is_root: true,
                    systemId: 1,
                    layoutId: 1
                },
                {
                    name: "HOTEL SERVICES",
                    is_root: true,
                    systemId: 1,
                    layoutId: 1
                },
                {
                    name: "DESTINATION VANUATU",
                    is_root: true,
                    systemId: 1,
                    layoutId: 1
                },
                {
                    name: "HOLIDAY INN RESORT PHOTO GALLERY",
                    is_root: true,
                    systemId: 1,
                    layoutId: 1
                },
                {
                    name: "IN-ROOM DINING",
                    is_root: false,
                    directoryListId: 1,
                    systemId: 1,
                    layoutId: 2
                },
                {
                    name: "SERVICES & FACILITIES",
                    is_root: false,
                    directoryListId: 1,
                    systemId: 1,
                    layoutId: 2
                },
                {
                    name: "PHONE DIRECTORY",
                    is_root: false,
                    directoryListId: 1,
                    systemId: 1,
                    layoutId: 2
                },
                {
                    name: "TV GUIDE",
                    is_root: false,
                    directoryListId: 1,
                    systemId: 1,
                    layoutId: 2
                },
                {
                    name: "HEALTH & SAFETY",
                    is_root: false,
                    directoryListId: 1,
                    systemId: 1,
                    layoutId: 2
                },
                {
                    name: "BREAKFAST",
                    is_root: false,
                    directoryListId: 5,
                    systemId: 1,
                    layoutId: 3
                },
                {
                    name: "LUNCH",
                    is_root: false,
                    directoryListId: 5,
                    systemId: 1,
                    layoutId: 3
                },
                {
                    name: "DINNER",
                    is_root: false,
                    directoryListId: 5,
                    systemId: 1,
                    layoutId: 3
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("directory_lists", null, {});
    }
};
