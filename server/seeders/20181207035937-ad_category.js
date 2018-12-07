"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "ad_categories",
            [
                {
                    name: "DESTINATION VANUATU"
                },
                {
                    name: "DESTINATION MILDURA"
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("ad_categories", null, {});
    }
};
