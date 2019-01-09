"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "galleries",
            [
                {
                    name: "MILDURA GALLERY 1",
                    layoutId: 2
                },
                {
                    name: "MILDURA GALLERY 2",
                    layoutId: 2
                },
                {
                    name: "VANUATU GALLERY 1",
                    layoutId: 1
                },
                {
                    name: "VANUATU GALLERY 2",
                    layoutId: 1
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("galleries", null, {});
    }
};
