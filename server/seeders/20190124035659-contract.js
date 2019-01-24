"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "contracts",
            [
                {
                    number: "11282-31220-JD",
                    file:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/CONTRACT_AS4000-1997.pdf",
                    package: "Hotel",
                    clientid: 1
                },
                {
                    number: "48789-20114-AJ",
                    file:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/CONTRACT_AS4000-1997.pdf",
                    package: "Company",
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
