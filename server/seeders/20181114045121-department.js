"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "departments",
            [
                {
                    name: "JBG MANAGERS",
                    is_standard_department: false
                },
                {
                    name: "HOLIDAY INN MANAGERS",
                    is_standard_department: false
                },
                {
                    name: "JBG DIGITAL STUDIO",
                    is_standard_department: false
                },
                {
                    name: "HOLIDAY INN IT SUPPORT",
                    is_standard_department: false
                },
                {
                    name: "MANAGEMENT",
                    is_standard_department: true
                },
                {
                    name: "KITCHEN",
                    is_standard_department: true
                },
                {
                    name: "MAINTENANCE",
                    is_standard_department: true
                },
                {
                    name: "ROOM SERVICE",
                    is_standard_department: true
                },
                {
                    name: "ACCOUNTS",
                    is_standard_department: true
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("departments", null, {});
    }
};
