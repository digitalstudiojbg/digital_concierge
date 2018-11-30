"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "validations",
            [
                {
                    name: "HAS_PHONE"
                },
                {
                    name: "HAS_LOCATION"
                },
                {
                    name: "HAS_PRICE"
                },
                {
                    name: "HAS_MAP"
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("validations", null, {});
    }
};
