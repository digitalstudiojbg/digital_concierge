"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "tier_layouts",
            [
                {
                    name: "TABLET_TIER_TYPE_1"
                },
                {
                    name: "TABLET_TIER_TYPE_2"
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("tier_layouts", null, {});
    }
};
