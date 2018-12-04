"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "validations",
            [
                {
                    name: "HAS_PHONE"
                },
                {
                    name: "HAS_LOCATION"
                },
                {
                    name: "HAS_PRICE"
                },
                {
                    name: "HAS_MAP"
                },
                {
                    name: "HAS_LP_HEADER_LOGO"
                },
                {
                    name: "HAS_LP_HEADER_TEXT"
                },
                {
                    name: "HAS_LP_BODY_IMAGE"
                },
                {
                    name: "HAS_LP_BG_COLOR"
                },
                {
                    name: "HAS_LP_BUTTON"
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("validations", null, {});
    }
};
