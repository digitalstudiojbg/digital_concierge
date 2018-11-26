"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "roles_permissions",
            [
                {
                    permissionId: 1,
                    roleId: 1
                },
                {
                    permissionId: 2,
                    roleId: 1
                },
                {
                    permissionId: 3,
                    roleId: 1
                },
                {
                    permissionId: 4,
                    roleId: 1
                },
                {
                    permissionId: 3,
                    roleId: 2
                },
                {
                    permissionId: 4,
                    roleId: 2
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("roles_permissions", null, {});
    }
};
