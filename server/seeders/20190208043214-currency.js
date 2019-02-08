"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "currencies",
            [
                {
                    name: "Australia Dollar"
                },
                {
                    name: "New Zealand Dollar"
                },
                {
                    name: "United States Dollar"
                },
                {
                    name: "Papua New Guinean Kina"
                },
                {
                    name: "Chinese Yuan"
                },
                {
                    name: "Vanuatu Vatu"
                },
                {
                    name: "Solomon Islands Dollar"
                },
                {
                    name: "Samoa Tala"
                },
                {
                    name: "Cook Islands Dollar"
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("currencies", null, {});
    }
};
