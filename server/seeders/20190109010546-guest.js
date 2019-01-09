"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "guests",
            [
                {
                    firstname: "Yijie",
                    lastname: "Shen",
                    email: "nealshen@johnbatman.com.au",
                    clientId: 2
                },

                {
                    firstname: "Calum",
                    lastname: "Beech",
                    email: "calum@johnbatman.com.au",
                    clientId: 2
                },
                {
                    firstname: "Jonathan",
                    lastname: "Wongsodihardjo",
                    email: "jonathan@johnbatman.com.au",
                    clientId: 2
                },
                {
                    firstname: "Laura",
                    lastname: "Morina",
                    email: "laura@johnbatman.com.au",
                    clientId: 2
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
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("guests", null, {});
    }
};
