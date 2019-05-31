"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "currencies",
            [
                {
                    name: "Australia Dollar",
                    code: "AUD"
                },
                {
                    name: "New Zealand Dollar",
                    code: "NZD"
                },
                {
                    name: "United States Dollar",
                    code: "USD"
                },
                {
                    name: "Papua New Guinean Kina",
                    code: "PGK"
                },
                {
                    name: "Chinese Yuan",
                    code: "CNY"
                },
                {
                    name: "Vanuatu Vatu",
                    code: "VUV"
                },
                {
                    name: "Solomon Islands Dollar",
                    code: "SBD"
                },
                {
                    name: "Samoa Tala",
                    code: "WST"
                },
                {
                    name: "Cook Islands Dollar",
                    code: "CKD"
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("currencies", null, {});
    }
};
