"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "homes",
            [
                {
                    name: "JBG HOME PAGE",
                    layoutId: 1
                },

                {
                    name: "HOLIDAY INN HOME PAGE",
                    layoutId: 1
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("homes", null, {});
    }
};
