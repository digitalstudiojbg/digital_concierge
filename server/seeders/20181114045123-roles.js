"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "roles",
            [
                {
                    name: "admin",
                    is_standard_role: false,
                    departmentId: 1,
                    clientId: 2
                },
                {
                    name: "admin_holiday",
                    is_standard_role: false,
                    departmentId: 2,
                    clientId: 1
                },
                {
                    name: "GENERAL MANAGER",
                    is_standard_role: true,
                    departmentId: 5
                },
                {
                    name: "KITCHEN MANAGER",
                    is_standard_role: true,
                    departmentId: 6
                },
                {
                    name: "MAINTENANCE MANAGER",
                    is_standard_role: true,
                    departmentId: 7
                },
                {
                    name: "CLEANER COORDINATOR",
                    is_standard_role: true,
                    departmentId: 8
                },
                {
                    name: "ACCOUNTS OFFICER",
                    is_standard_role: true,
                    departmentId: 9
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("roles", null, {});
    }
};
