"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "groups",
            [
                {
                    name: "JBG ADMINISTRATOR",
                    clientId: 2
                },

                {
                    name: "HOLIDAY INN ADMINISTRATOR",
                    clientId: 1
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("groups", null, {});
    }
};
