"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        const current = new Date();
        let nextYear = new Date();
        nextYear.setDate(current.getDate() + 365);

        return queryInterface.bulkInsert(
            "licenses",
            [
                {
                    key: "1111-2222-3333-4444",
                    commence_date: current,
                    expire_date: nextYear,
                    auto_renewal: true,
                    licenseTypeId: 1,
                    clientId: 1
                },
                {
                    key: "5555-6666-7777-8888",
                    commence_date: current,
                    expire_date: nextYear,
                    auto_renewal: true,
                    licenseTypeId: 2,
                    clientId: 3
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("licenses", null, {});
    }
};
