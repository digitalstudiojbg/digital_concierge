"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "jbg_directory_lists",
            [
                {
                    name: "DESTINATION VANUATU",
                    title: "DESTINATION VANUATU",
                    is_root: true,
                    layoutId: 1
                },
                {
                    name: "DESTINATION MILDURA",
                    title: "DESTINATION MILDURA",
                    is_root: true,
                    layoutId: 1
                },
                {
                    name: "ACTIVITIES",
                    title: "ACTIVITIES",
                    jbgDirectoryListId: 1,
                    is_root: false,
                    layoutId: 1
                },
                {
                    name: "EVENTS",
                    title: "EVENTS",
                    jbgDirectoryListId: 1,
                    is_root: false,
                    layoutId: 1
                },
                {
                    name: "TREKKING",
                    title: "TREKKING",
                    jbgDirectoryListId: 3,
                    is_root: false,
                    layoutId: 1
                },
                {
                    name: "DIVING",
                    title: "DIVING",
                    jbgDirectoryListId: 3,
                    is_root: false,
                    layoutId: 1
                },
                {
                    name: "FISHING",
                    title: "FISHING",
                    jbgDirectoryListId: 3,
                    is_root: false,
                    layoutId: 1
                },
                {
                    name: "JUNE",
                    title: "JUNE",
                    jbgDirectoryListId: 4,
                    is_root: false,
                    layoutId: 1
                },
                {
                    name: "AUGUST",
                    title: "AUGUST",
                    jbgDirectoryListId: 4,
                    is_root: false,
                    layoutId: 1
                },
                {
                    name: "SEPTEMBER",
                    title: "SEPTEMBER",
                    jbgDirectoryListId: 4,
                    is_root: false,
                    layoutId: 1
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("jbg_directory_lists", null, {});
    }
};
