"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "roles",
            [
                {
                    name: "admin",
                    is_standard_role: true,
                    departmentId: 1
                },
                {
                    name: "admin_holiday",
                    is_standard_role: true,
                    departmentId: 2
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("roles", null, {});
    }
};
