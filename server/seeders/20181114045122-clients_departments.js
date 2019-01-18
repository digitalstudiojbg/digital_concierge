"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "clients_departments",
            [
                {
                    clientId: 1,
                    departmentId: 1
                },
                {
                    clientId: 1,
                    departmentId: 3
                },
                {
                    clientId: 2,
                    departmentId: 2
                },
                {
                    clientId: 2,
                    departmentId: 4
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("clients_departments", null, {});
    }
};
