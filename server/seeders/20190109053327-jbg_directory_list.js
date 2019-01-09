"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "jbg_directory_lists",
            [
                {
                    name: "DESTINATION VANUATU",
                    is_root: true,
                    layoutId: 1
                },
                {
                    name: "DESTINATION MILDURA",
                    is_root: true,
                    layoutId: 1
                },
                {
                    name: "ACTIVITIES",
                    jbgDirectoryListId: 1,
                    is_root: false,
                    layoutId: 1
                },
                {
                    name: "EVENTS",
                    jbgDirectoryListId: 1,
                    is_root: false,
                    layoutId: 1
                },
                {
                    name: "TREKKING",
                    jbgDirectoryListId: 3,
                    is_root: false,
                    layoutId: 1
                },
                {
                    name: "DIVING",
                    jbgDirectoryListId: 3,
                    is_root: false,
                    layoutId: 1
                },
                {
                    name: "FISHING",
                    jbgDirectoryListId: 3,
                    is_root: false,
                    layoutId: 1
                },
                {
                    name: "JUNE",
                    jbgDirectoryListId: 4,
                    is_root: false,
                    layoutId: 1
                },
                {
                    name: "AUGUST",
                    jbgDirectoryListId: 4,
                    is_root: false,
                    layoutId: 1
                },
                {
                    name: "SEPTEMBER",
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
