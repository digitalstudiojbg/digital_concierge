"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "permissions",
            [
                {
                    name: "CREATE_PARENT_CATEGORY"
                },
                {
                    name: "READ_PARENT_CATEGORY"
                },
                {
                    name: "UPDATE_PARENT_CATEGORY"
                },
                {
                    name: "DELETE_PARENT_CATEGORY"
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("permissions", null, {});
    }
};
