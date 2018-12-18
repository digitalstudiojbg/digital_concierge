"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "tier_layouts_validations",
            [
                {
                    tierLayoutId: 1,
                    validationId: 10
                },
                {
                    tierLayoutId: 1,
                    validationId: 11
                },
                {
                    tierLayoutId: 2,
                    validationId: 10
                },
                {
                    tierLayoutId: 2,
                    validationId: 11
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("tier_layouts_validations", null, {});
    }
};
