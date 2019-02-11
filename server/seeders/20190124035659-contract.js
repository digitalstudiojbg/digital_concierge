"use strict";

module.exports = {
    up: queryInterface => {
        const current = new Date();
        let nextYear = new Date();
        nextYear.setDate(current.getDate() + 365);

        return queryInterface.bulkInsert(
            "contracts",
            [
                {
                    number: "11282-31220-JD",
                    file:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/CONTRACT_AS4000-1997.pdf",
                    agreement_date: current,
                    renewal_date: nextYear,
                    clientid: 1
                },
                {
                    number: "48789-20114-AJ",
                    file:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/CONTRACT_AS4000-1997.pdf",
                    agreement_date: current,
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
