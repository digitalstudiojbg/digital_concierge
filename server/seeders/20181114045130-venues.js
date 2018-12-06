"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "venues",
            [
                {
                    name: "Holiday Inn",
                    number_of_users: 5,
                    active: true,
                    has_tablet: true,
                    has_touchscreen: true,
                    has_parent_category: false,
                    logo:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/Holiday_Inn_Logo.png"
                },
                {
                    name: "John Batman Group",
                    number_of_users: 15,
                    active: true,
                    has_tablet: true,
                    has_touchscreen: true,
                    has_parent_category: true,
                    logo:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/jbg_logo.png"
                },
                {
                    name: "Airways Residences",
                    number_of_users: 15,
                    active: true,
                    has_tablet: true,
                    has_touchscreen: true,
                    has_parent_category: true,
                    logo:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/jbg_logo.png"
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("venues", null, {});
    }
};
