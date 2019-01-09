"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "jbg_maps",
            [
                {
                    name: "AIF MAP MILDURA",
                    layoutId: 1
                },

                {
                    name: "AIF MAP VANUATU",
                    layoutId: 1
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("jbg_maps", null, {});
    }
};
