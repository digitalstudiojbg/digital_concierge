"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "roles",
            [
                {
                    name: "admin",
                    is_admin: true,
                    groupId: 1
                },
                {
                    name: "admin",
                    is_admin: true,
                    groupId: 2
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("roles", null, {});
    }
};
