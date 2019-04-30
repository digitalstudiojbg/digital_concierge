"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "homes",
            [
                {
                    description: "<p>WELCOME TO JBG</p>",
                    layoutId: 4
                },

                {
                    description: "<p>WELCOME TO HOLIDAY INN RESORT VANUATU</p>",
                    layoutId: 4
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("homes", null, {});
    }
};
