"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "contents",
            [
                {
                    name: "LIST: IN ROOM SERVICES",
                    is_root: true,
                    is_list: true
                },
                {
                    name: "LIST: IN ROOM DINING",
                    is_root: false,
                    is_list: true
                },
                {
                    name: "LIST: BREAKFAST",
                    is_root: false,
                    is_list: true
                },
                {
                    name: "LIST: LUNCH",
                    is_root: false,
                    is_list: true
                },
                {
                    name: "ENTRY: BREAD MENU",
                    is_root: false,
                    is_list: false
                },
                {
                    name: "ENTRY: LUNCH MENU",
                    is_root: false,
                    is_list: false
                },
                {
                    name: "ENTRY: MAP",
                    is_root: true,
                    is_list: false
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("contents", null, {});
    }
};
