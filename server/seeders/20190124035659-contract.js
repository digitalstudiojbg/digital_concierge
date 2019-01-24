"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "contracts",
            [
                {
                    number: "11282-31220-JD",
                    file:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/AS4000+1997.pdf",
                    package: "Hotel",
                    clientid: 1
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("contracts", null, {});
    }
};
