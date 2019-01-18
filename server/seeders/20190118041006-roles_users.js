"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "roles_users",
            [
                {
                    userId: 1,
                    roleId: 1
                },
                {
                    userId: 2,
                    roleId: 2
                },
                {
                    userId: 3,
                    roleId: 1
                }
            ],
            {}
        );
    },

    down: queryInterface => {
        return queryInterface.bulkDelete("roles_users", null, {});
    }
};
