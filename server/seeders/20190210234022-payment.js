"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        const current = new Date();
        let nextMonth = new Date();
        nextMonth.setDate(current.getDate() + 30);

        return queryInterface.bulkInsert(
            "payments",
            [
                {
                    invoice_number: "INVOICE_001",
                    invoice_date: current,
                    invoice_amount: 10000.55,
                    payable_date: nextMonth,
                    currencyId: 6,
                    clientId: 1
                },
                {
                    invoice_number: "INVOICE_002",
                    invoice_date: current,
                    invoice_amount: 15000,
                    payable_date: nextMonth,
                    currencyId: 6,
                    clientId: 1
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("payments", null, {});
    }
};
