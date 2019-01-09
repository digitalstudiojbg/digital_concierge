"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "starts",
            [
                {
                    name: "JBG START PAGE",
                    layoutId: 1
                },

                {
                    name: "HOLIDAY INN START PAGE",
                    layoutId: 1
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("starts", null, {});
    }
};
