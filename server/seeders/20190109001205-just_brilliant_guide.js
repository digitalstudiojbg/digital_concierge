"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "just_brilliant_guides",
            [
                {
                    name: "VANUATU",
                    location: "VANUATU",
                    jbgWelcomeId: 1
                },
                {
                    name: "MILDURA",
                    location: "MILDURA",
                    jbgWelcomeId: 2
                },
                {
                    name: "BASS COAST",
                    location: "BASS COAST",
                    jbgWelcomeId: 1
                },
                {
                    name: "PORT AUGUSTA",
                    location: "PORT AUGUSTA",
                    jbgWelcomeId: 2
                },
                {
                    name: "MOUNT GAMBIER",
                    location: "MOUNT GAMBIER",
                    jbgWelcomeId: 1
                },
                {
                    name: "MARGARET RIVER",
                    location: "MARGARET RIVER",
                    jbgWelcomeId: 2
                },
                {
                    name: "KUNUNURRA",
                    location: "KUNUNURRA",
                    jbgWelcomeId: 1
                },
                {
                    name: "KANGAROO ISLAND",
                    location: "KANGAROO ISLAND",
                    jbgWelcomeId: 2
                },
                {
                    name: "COFFS HARBOUR",
                    location: "COFFS HARBOUR",
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
