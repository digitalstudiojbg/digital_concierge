"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "tb_media",
            [
                {
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/Holiday_Inn_Logo.png",
                    type: "image"
                },

                {
                    path:
                        "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_users/jbg_logo.png",
                    type: "image"
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("tb_media", null, {});
    }
};
