"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "directory_lists",
            [
                {
                    name: "IN-ROOM SERVICES",
                    title: "IN-ROOM SERVICES",
                    is_root: true,
                    systemId: 1,
                    layoutId: 1
                },
                {
                    name: "HOTEL SERVICES",
                    title: "HOTEL SERVICES",
                    is_root: true,
                    systemId: 1,
                    layoutId: 1
                },
                {
                    name: "DESTINATION VANUATU",
                    title: "DESTINATION VANUATU",
                    is_root: true,
                    systemId: 1,
                    layoutId: 1
                },
                {
                    name: "HOLIDAY INN RESORT PHOTO GALLERY",
                    title: "HOLIDAY INN RESORT PHOTO GALLERY",
                    is_root: true,
                    systemId: 1,
                    layoutId: 1
                },
                {
                    name: "IN-ROOM DINING",
                    title: "IN-ROOM DINING",
                    is_root: false,
                    directoryListId: 1,
                    systemId: 1,
                    layoutId: 2
                },
                {
                    name: "SERVICES & FACILITIES",
                    title: "SERVICES & FACILITIES",
                    is_root: false,
                    directoryListId: 1,
                    systemId: 1,
                    layoutId: 2
                },
                {
                    name: "PHONE DIRECTORY",
                    title: "PHONE DIRECTORY",
                    is_root: false,
                    directoryListId: 1,
                    systemId: 1,
                    layoutId: 2
                },
                {
                    name: "TV GUIDE",
                    title: "TV GUIDE",
                    is_root: false,
                    directoryListId: 1,
                    systemId: 1,
                    layoutId: 2
                },
                {
                    name: "HEALTH & SAFETY",
                    title: "HEALTH & SAFETY",
                    is_root: false,
                    directoryListId: 1,
                    systemId: 1,
                    layoutId: 2
                },
                {
                    name: "BREAKFAST",
                    title: "BREAKFAST",
                    is_root: false,
                    directoryListId: 5,
                    systemId: 1,
                    layoutId: 3
                },
                {
                    name: "LUNCH",
                    title: "LUNCH",
                    is_root: false,
                    directoryListId: 5,
                    systemId: 1,
                    layoutId: 3
                },
                {
                    name: "DINNER",
                    title: "DINNER",
                    is_root: false,
                    directoryListId: 5,
                    systemId: 1,
                    layoutId: 3
                }
            ],
            {}
        );
    },

    down: (queryInterface, _Sequelize) => {
        return queryInterface.bulkDelete("directory_lists", null, {});
    }
};
