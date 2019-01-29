"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "states",
            [
                {
                    name: "Australian Capital Territory",
                    countryId: 1
                },
                {
                    name: "New South Wales",
                    countryId: 1
                },
                {
                    name: "Northern Territory",
                    countryId: 1
                },
                {
                    name: "Queensland",
                    countryId: 1
                },
                {
                    name: "South Australia",
                    countryId: 1
                },
                {
                    name: "Tasmania",
                    countryId: 1
                },
                {
                    name: "Victoria",
                    countryId: 1
                },
                {
                    name: "Morobe",
                    countryId: 2
                },
                {
                    name: "Eastern Highlands",
                    countryId: 2
                },
                {
                    name: "Southern Highlands",
                    countryId: 2
                },
                {
                    name: "Madang",
                    countryId: 2
                },
                {
                    name: "East Sepik",
                    countryId: 2
                },
                {
                    name: "	Malampa",
                    countryId: 3
                },
                {
                    name: "Penama",
                    countryId: 3
                },
                {
                    name: "Sanma",
                    countryId: 3
                },
                {
                    name: "Shefa",
                    countryId: 3
                },
                {
                    name: "Tafea",
                    countryId: 3
                },
                {
                    name: "Torba",
                    countryId: 3
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("states", null, {});
    }
};
