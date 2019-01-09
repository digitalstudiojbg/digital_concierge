"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "layouts",
            [
                {
                    name: "GENERAL LAYOUT"
                },

                {
                    name: "LAYOUT 1"
                },
                {
                    name: "LAYOUT 2"
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("layouts", null, {});
    }
};
