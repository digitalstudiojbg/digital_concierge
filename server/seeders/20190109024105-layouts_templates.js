"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "layouts_templates",
            [
                {
                    layoutId: 1,
                    templateId: 1
                },
                {
                    layoutId: 2,
                    templateId: 1
                },
                {
                    layoutId: 3,
                    templateId: 1
                },
                {
                    layoutId: 1,
                    templateId: 2
                },
                {
                    layoutId: 2,
                    templateId: 2
                },
                {
                    layoutId: 3,
                    templateId: 2
                },
                {
                    layoutId: 1,
                    templateId: 3
                },
                {
                    layoutId: 2,
                    templateId: 3
                },
                {
                    layoutId: 3,
                    templateId: 3
                },
                {
                    layoutId: 1,
                    templateId: 4
                },
                {
                    layoutId: 2,
                    templateId: 4
                },
                {
                    layoutId: 3,
                    templateId: 4
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("layouts_templates", null, {});
    }
};
