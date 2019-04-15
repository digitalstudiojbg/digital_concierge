"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "directory_lists",
            [
                {
                    name: "IN-ROOM SERVICES",
                    title: "<p>IN-ROOM SERVICES</p>",
                    title_plaintext: "IN-ROOM SERVICES",
                    is_root: true,
                    systemId: 1,
                    layoutId: 7
                    // templateId: 5
                },
                {
                    name: "HOTEL SERVICES",
                    title: "<p>HOTEL SERVICES</p>",
                    title_plaintext: "HOTEL SERVICES",
                    is_root: true,
                    systemId: 1,
                    layoutId: 7
                    // templateId: 6
                },
                {
                    name: "DESTINATION VANUATU",
                    title: "<p>DESTINATION VANUATU</p>",
                    title_plaintext: "DESTINATION VANUATU",
                    is_root: true,
                    systemId: 1,
                    layoutId: 7
                    // templateId: 5
                },
                {
                    name: "HOLIDAY INN RESORT PHOTO GALLERY",
                    title: "<p>HOLIDAY INN RESORT PHOTO GALLERY</p>",
                    title_plaintext: "HOLIDAY INN RESORT PHOTO GALLERY",
                    is_root: true,
                    systemId: 1,
                    layoutId: 7
                    // templateId: 6
                },
                {
                    name: "IN-ROOM DINING",
                    title: "<p>IN-ROOM DINING</p>",
                    title_plaintext: "IN-ROOM DINING",
                    is_root: false,
                    directoryListId: 1,
                    systemId: 1,
                    layoutId: 7
                    // templateId: 5
                },
                {
                    name: "SERVICES & FACILITIES",
                    title: "<p>SERVICES & FACILITIES</p>",
                    title_plaintext: "SERVICES & FACILITIES",
                    is_root: false,
                    directoryListId: 1,
                    systemId: 1,
                    layoutId: 7
                    // templateId: 6
                },
                {
                    name: "PHONE DIRECTORY",
                    title: "<p>PHONE DIRECTORY</p>",
                    title_plaintext: "PHONE DIRECTORY",
                    is_root: false,
                    directoryListId: 1,
                    systemId: 1,
                    layoutId: 7
                    // templateId: 5
                },
                {
                    name: "TV GUIDE",
                    title: "<p>TV GUIDE</p>",
                    title_plaintext: "TV GUIDE",
                    is_root: false,
                    directoryListId: 1,
                    systemId: 1,
                    layoutId: 7
                    // templateId: 6
                },
                {
                    name: "HEALTH & SAFETY",
                    title: "<p>HEALTH & SAFETY</p>",
                    title_plaintext: "HEALTH & SAFETY",
                    is_root: false,
                    directoryListId: 1,
                    systemId: 1,
                    layoutId: 7
                    // templateId: 5
                },
                {
                    name: "BREAKFAST",
                    title: "<p>BREAKFAST</p>",
                    title_plaintext: "BREAKFAST",
                    is_root: false,
                    directoryListId: 5,
                    systemId: 1,
                    layoutId: 7
                    // templateId: 6
                },
                {
                    name: "LUNCH",
                    title: "<p>LUNCH</p>",
                    title_plaintext: "LUNCH",
                    is_root: false,
                    directoryListId: 5,
                    systemId: 1,
                    layoutId: 7
                    // templateId: 5
                },
                {
                    name: "DINNER",
                    title: "<p>DINNER</p>",
                    title_plaintext: "DINNER",
                    is_root: false,
                    directoryListId: 5,
                    systemId: 1,
                    layoutId: 7
                    // templateId: 6
                }
            ],
            {}
        );
    },

    down: (queryInterface, _Sequelize) => {
        return queryInterface.bulkDelete("directory_lists", null, {});
    }
};
