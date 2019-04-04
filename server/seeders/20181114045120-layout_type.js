"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "layout_types",
            [
                {
                    name: "start"
                },
                {
                    name: "home"
                },
                {
                    name: "list"
                },
                {
                    name: "entry"
                },
                {
                    name: "promotion"
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("layout_types", null, {});
    }
};
