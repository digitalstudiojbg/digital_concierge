"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "layouts",
            [
                {
                    name: "GENERAL LAYOUT",
                    mediumId: 1,
                    layoutFamilyId: 1
                },

                {
                    name: "LAYOUT 1",
                    mediumId: 2,
                    layoutFamilyId: 2
                },
                {
                    name: "LAYOUT 2",
                    mediumId: 1,
                    layoutFamilyId: 2
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("layouts", null, {});
    }
};
