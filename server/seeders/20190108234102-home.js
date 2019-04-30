"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "homes",
            [
                {
                    description: "<p>WELCOME TO JBG</p>",
                    layoutId: 16
                },

                {
                    description: "<p>WELCOME TO HOLIDAY INN RESORT VANUATU</p>",
                    layoutId: 16
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("homes", null, {});
    }
};
