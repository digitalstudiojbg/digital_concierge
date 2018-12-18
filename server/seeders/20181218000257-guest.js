"use strict";

module.exports = {
    up: (queryInterface, _Sequelize) => {
        return queryInterface.bulkInsert(
            "guests",
            [
                {
                    firstname: "Douglas",
                    lastname: "Shetland",
                    email: "douglas@displace.com",
                    venueId: 2
                },
                {
                    firstname: "Arnis",
                    lastname: "Gross",
                    email: "arnis.gross@fmcustomapps.com",
                    venueId: 2
                },
                {
                    firstname: "Bennett",
                    lastname: "Kotong",
                    email: "ben@jbg.com.pg",
                    venueId: 2
                }
            ],
            {}
        );
    },

    down: (queryInterface, _Sequelize) => {
        return queryInterface.bulkDelete("guests", null, {});
    }
};
