"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "countries_currencies",
            [
                {
                    countryId: 1,
                    currencyId: 1
                },
                {
                    countryId: 2,
                    currencyId: 4
                },
                {
                    countryId: 2,
                    currencyId: 1
                },
                {
                    countryId: 3,
                    currencyId: 6
                },
                {
                    countryId: 3,
                    currencyId: 3
                }
            ],
            {}
        );
    },

    down: queryInterface => {
        return queryInterface.bulkDelete("countries_currencies", null, {});
    }
};
