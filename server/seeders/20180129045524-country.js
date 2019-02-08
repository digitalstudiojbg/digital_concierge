"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "countries",
            [
                {
                    name: "Australia"
                },
                {
                    name: "Papua New Guinea"
                },
                {
                    name: "Vanuatu"
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("countries", null, {});
    }
};
