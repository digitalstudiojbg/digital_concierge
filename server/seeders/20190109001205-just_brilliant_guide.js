"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "just_brilliant_guides",
            [
                {
                    name: "MILDURA AIF",
                    location: "MILDURA",
                    jbgWelcomeId: 1
                },

                {
                    name: "VANUATU AIF",
                    location: "VANUATU",
                    jbgWelcomeId: 2
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("just_brilliant_guides", null, {});
    }
};
