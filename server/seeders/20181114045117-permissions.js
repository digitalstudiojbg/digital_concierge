"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "permissions",
            [
                {
                    name: "CREATE PARENT DIRECTORY LIST",
                    permissionCategoryId: 1
                },
                {
                    name: "READ PARENT DIRECTORY LIST",
                    permissionCategoryId: 1
                },
                {
                    name: "UPDATE PARENT DIRECTORY LIST",
                    permissionCategoryId: 1
                },
                {
                    name: "DELETE PARENT DIRECTORY LIST",
                    permissionCategoryId: 1
                },
                {
                    name: "MANAGE ORDERS",
                    permissionCategoryId: 2
                },
                {
                    name: "EDIT_ORDERS",
                    permissionCategoryId: 2
                },
                {
                    name: "ADD ORDERS",
                    permissionCategoryId: 2
                },
                {
                    name: "MANAGE RETURNS",
                    permissionCategoryId: 2
                },
                {
                    name: "CAPTURE FUNDS",
                    permissionCategoryId: 2
                },
                {
                    name: "MANAGE USERS",
                    permissionCategoryId: 3
                },
                {
                    name: "ADD USERS",
                    permissionCategoryId: 3
                },
                {
                    name: "EDIT USERS",
                    permissionCategoryId: 3
                },
                {
                    name: "DELETE USERS",
                    permissionCategoryId: 3
                },
                {
                    name: "MANAGE FORM FIELDS",
                    permissionCategoryId: 3
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("permissions", null, {});
    }
};
