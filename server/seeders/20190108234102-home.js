"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "homes",
            [
                {
                    description: "<p>WELCOME TO JBG</p>",
                    button_text: "<p>EXPLORE</p>",
                    layoutId: 1
                },

                {
                    description: "<p>WELCOME TO HOLIDAY INN RESORT VANUATU</p>",
                    button_text: "<p>EXPLORE</p>",
                    layoutId: 1
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("homes", null, {});
    }
};
