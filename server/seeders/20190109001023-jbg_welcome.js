"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "jbg_welcomes",
            [
                {
                    name: "WELCOME MILDURA",
                    layoutId: 1
                },

                {
                    name: "WELCOME VANUATU",
                    layoutId: 1
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("jbg_welcomes", null, {});
    }
};
