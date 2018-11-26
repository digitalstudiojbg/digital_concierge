"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "roles_venues",
            [
                {
                    venueId: 1,
                    roleId: 1
                },
                {
                    venueId: 1,
                    roleId: 2
                },
                {
                    venueId: 1,
                    roleId: 3
                },
                {
                    venueId: 2,
                    roleId: 1
                },
                {
                    venueId: 2,
                    roleId: 4
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("roles_venues", null, {});
    }
};
