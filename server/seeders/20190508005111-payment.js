"use strict";

module.exports = {
    up: queryInterface => {
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
                },
                {
                    invoice_number: "INVOICE_003",
                    invoice_date: current,
                    invoice_amount: 10000.55,
                    payable_date: nextMonth,
                    currencyId: 6,
                    advertisingId: 1
                },
                {
                    invoice_number: "INVOICE_004",
                    invoice_date: current,
                    invoice_amount: 15000,
                    payable_date: nextMonth,
                    currencyId: 1,
                    advertisingId: 3
                },
                {
                    invoice_number: "INVOICE_005",
                    invoice_date: current,
                    invoice_amount: 10000.55,
                    payable_date: nextMonth,
                    currencyId: 1,
                    advertisingId: 4
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("payments", null, {});
    }
};
