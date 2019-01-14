"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "clients",
            [
                {
                    name: "HOLIDAY INN",
                    has_parent_category: 1,
                    active: true,
                    has_tablet: true,
                    has_touchscreen: true,
                    number_of_users: 5,
                    avatar: "inn.png"
                },

                {
                    name: "JOHN BATMAN GROUP",
                    has_parent_category: 1,
                    active: true,
                    has_tablet: true,
                    has_touchscreen: true,
                    number_of_users: 5,
                    avatar: "jbg.png"
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("clients", null, {});
    }
};
