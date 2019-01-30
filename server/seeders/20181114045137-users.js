"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
    up: (queryInterface, Sequelize) => {
        const hash = bcrypt.hashSync("admin", saltRounds);

        return queryInterface.bulkInsert(
            "users",
            [
                {
                    name: "Yijie SHEN",
                    email: "nealshen@johnbatman.com.au",
                    password: hash,
                    active: true,
                    mediumId: 2,
                    clientId: 2,
                    first_phone_number: "0425872504",
                    position: "Owner"
                },
                {
                    name: "Holiday Inn",
                    email: "admin@holidayinn.com.au",
                    password: hash,
                    active: true,
                    mediumId: 1,
                    clientId: 1,
                    first_phone_number: "0425872504"
                },
                {
                    name: "Neal Shen",
                    email: "admin@admin.com.au",
                    password: hash,
                    active: true,
                    mediumId: 2,
                    clientId: 2,
                    first_phone_number: "0425872504",
                    position: "Founder"
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("users", null, {});
    }
};
