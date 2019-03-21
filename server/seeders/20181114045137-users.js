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
                    name: "Jonathan Adhitama",
                    email: "jonathan@johnbatman.com.au",
                    password: hash,
                    active: true,
                    mediumId: 2,
                    clientId: 2,
                    first_phone_number: "0425872504",
                    position: "Developer"
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
                    name: "Matthew Senyard",
                    email: "matt@ihg.com",
                    password: hash,
                    active: true,
                    mediumId: 1,
                    clientId: 1,
                    first_phone_number: "0425872504",
                    position: "Acting General Manager"
                },
                {
                    name: "Calum Beech",
                    email: "calum@johnbatman.com.au",
                    password: hash,
                    active: true,
                    mediumId: 2,
                    clientId: 2,
                    first_phone_number: "0425872504",
                    position: "Digital Integration Coordinator"
                },
                {
                    name: "Laura Morina",
                    email: "laura@johnbatman.com.au",
                    password: hash,
                    active: true,
                    mediumId: 2,
                    clientId: 2,
                    first_phone_number: "0425872504",
                    position: "Graphics Designer"
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("users", null, {});
    }
};
