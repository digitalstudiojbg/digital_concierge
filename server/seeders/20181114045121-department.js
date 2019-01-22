"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "departments",
            [
                {
                    name: "JBG MANAGERS"
                },
                {
                    name: "HOLIDAY INN MANAGERS"
                },
                {
                    name: "JBG DIGITAL STUDIO"
                },
                {
                    name: "HOLIDAY INN IT SUPPORT"
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("departments", null, {});
    }
};
