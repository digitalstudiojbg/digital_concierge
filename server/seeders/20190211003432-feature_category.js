"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "feature_categories",
            [
                {
                    name: "BASIC DIRECTORY"
                },
                {
                    name: "ROOM SERVICE"
                }
            ],
            {}
        );
    },

    down: queryInterface => {
        return queryInterface.bulkDelete("feature_categories", null, {});
    }
};
