"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "layout_families",
            [
                {
                    name: "MATERIAL UI-BASED"
                },

                {
                    name: "MINIMALIST"
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("layout_families", null, {});
    }
};
