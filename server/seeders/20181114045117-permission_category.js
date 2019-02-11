"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "permission_categories",
            [
                {
                    name: "DIRECTORY LIST PERMISSIONS"
                },
                {
                    name: "ORDER PERMISSIONS"
                },
                {
                    name: "SYSTEM ADMINISTRATOR PERMISSIONS"
                }
            ],
            {}
        );
    },

    down: queryInterface => {
        return queryInterface.bulkDelete("permission_categories", null, {});
    }
};
