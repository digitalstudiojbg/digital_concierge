"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "guests",
            [
                {
                    firstname: "Sample",
                    lastname: "Guest 1",
                    email: "sample1@sampleVenue.com.au",
                    clientId: 3
                },

                {
                    firstname: "Sample",
                    lastname: "Guest 2",
                    email: "sample2@sampleVenue.com.au",
                    clientId: 3
                },
                {
                    firstname: "Sample",
                    lastname: "Guest 3",
                    email: "sample3@sampleVenue.com.au",
                    clientId: 3
                },
                {
                    firstname: "Sample",
                    lastname: "Guest 4",
                    email: "sample4@sampleVenue.com.au",
                    clientId: 3
                },
                {
                    firstname: "Douglas",
                    lastname: "Shetland",
                    email: "douglas@displace.com",
                    clientId: 1
                },
                {
                    firstname: "Chris",
                    lastname: "Redfield",
                    email: "chris.redfield@bsaa.com",
                    clientId: 1
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("guests", null, {});
    }
};
