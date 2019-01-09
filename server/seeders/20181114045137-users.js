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
                    roleId: 1,
                    mediumId: 2,
                    clientId: 2
                },
                {
                    name: "Holiday Inn",
                    email: "admin@holidayinn.com.au",
                    password: hash,
                    active: true,
                    roleId: 2,
                    mediumId: 1,
                    clientId: 1
                },
                {
                    name: "Neal Shen",
                    email: "admin@admin.com.au",
                    password: hash,
                    active: true,
                    roleId: 1,
                    mediumId: 2,
                    clientId: 2
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("users", null, {});
    }
};
