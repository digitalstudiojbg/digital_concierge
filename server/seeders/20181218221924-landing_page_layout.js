"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "landing_page_layouts",
            [
                {
                    name: "TABLET_LANDING_PAGE_TYPE_1"
                },
                {
                    name: "TABLET_LANDING_PAGE_TYPE_2"
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("landing_page_layouts", null, {});
    }
};
