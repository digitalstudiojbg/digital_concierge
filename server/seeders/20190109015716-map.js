"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "maps",
            [
                {
                    name: "MILDURA MAP 1",
                    layoutId: 2
                },
                {
                    name: "MILDURA MAP 2",
                    layoutId: 2
                },
                {
                    name: "VANUATU MAP 1",
                    layoutId: 1
                },
                {
                    name: "VANUATU MAP 2",
                    layoutId: 1
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("maps", null, {});
    }
};
