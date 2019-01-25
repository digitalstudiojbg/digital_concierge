"use strict";

module.exports = {
    up: queryInterface => {
        const currentYear = new Date().getFullYear();
        let nextYear = new Date();
        nextYear.setFullYear(currentYear + 1);
        return queryInterface.bulkInsert(
            "contracts",
            [
                {
                    number: "11282-31220-JD",
                    file:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/CONTRACT_AS4000-1997.pdf",
                    package: "Hotel",
                    annual_fee: "3600VT",
                    renewal_date: nextYear,
                    clientid: 1
                },
                {
                    number: "48789-20114-AJ",
                    file:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/CONTRACT_AS4000-1997.pdf",
                    package: "Company",
                    annual_fee: "3000AUD",
                    renewal_date: nextYear,
                    clientid: 2
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("contracts", null, {});
    }
};
