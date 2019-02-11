"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "license_types",
            [
                {
                    name: "6 Months"
                },
                {
                    name: "12 Months"
                },
                {
                    name: "24 Months"
                },
                {
                    name: "36 Months"
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("license_types", null, {});
    }
};
