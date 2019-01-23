"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "media",
            [
                {
                    name: "HOLIDAY INN LOGO",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/Holiday_Inn_Logo.png",
                    type: "image",
                    clientId: 1,
                    key: "cms_users/Holiday_Inn_Logo.png"
                },

                {
                    name: "JOHN BATMAN GROUP LOGO",
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/jbg_logo.png",
                    type: "image",
                    clientId: 2,
                    key: "cms_users/jbg_logo.png"
                }
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("media", null, {});
    }
};
