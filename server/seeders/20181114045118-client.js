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
                    avatar:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/Holiday_Inn_Logo.png"
                },

                {
                    name: "JOHN BATMAN GROUP",
                    has_parent_category: 1,
                    active: true,
                    has_tablet: true,
                    has_touchscreen: true,
                    number_of_users: 5,
                    avatar:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/jbg_logo.png"
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("clients", null, {});
    }
};
