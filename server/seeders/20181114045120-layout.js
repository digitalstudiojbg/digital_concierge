"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "layouts",
            [
                {
                    name: "GENERAL LAYOUT",
                    mediumId: 1
                },

                {
                    name: "LAYOUT 1",
                    mediumId: 2
                },
                {
                    name: "LAYOUT 2",
                    mediumId: 1
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("layouts", null, {});
    }
};
