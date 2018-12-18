"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "systems",
            [
                {
                    name: "JBG Tablet",
                    venueId: 2
                },
                {
                    name: "JBG Touchscreen",
                    venueId: 2
                },
                {
                    name: "Holiday Inn Touchscreen",
                    venueId: 1
                },
                {
                    name: "Holiday Inn Tablet",
                    venueId: 1
                },
                {
                    name: "Airways Residences Tablet",
                    venueId: 3
                },
                {
                    name: "Airways Residences Touchscreen",
                    venueId: 3
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("systems", null, {});
    }
};
