"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "layouts_templates",
            [
                {
                    layoutId: 10,
                    templateId: 1
                },
                {
                    layoutId: 11,
                    templateId: 1
                },
                {
                    layoutId: 12,
                    templateId: 1
                },
                {
                    layoutId: 25,
                    templateId: 1
                },
                {
                    layoutId: 26,
                    templateId: 1
                },
                {
                    layoutId: 27,
                    templateId: 1
                },

                {
                    layoutId: 10,
                    templateId: 2
                },
                {
                    layoutId: 11,
                    templateId: 2
                },
                {
                    layoutId: 12,
                    templateId: 2
                },
                {
                    layoutId: 25,
                    templateId: 2
                },
                {
                    layoutId: 26,
                    templateId: 2
                },
                {
                    layoutId: 27,
                    templateId: 2
                },

                {
                    layoutId: 10,
                    templateId: 3
                },
                {
                    layoutId: 11,
                    templateId: 3
                },
                {
                    layoutId: 12,
                    templateId: 3
                },
                {
                    layoutId: 25,
                    templateId: 3
                },
                {
                    layoutId: 26,
                    templateId: 3
                },
                {
                    layoutId: 27,
                    templateId: 3
                },

                {
                    layoutId: 10,
                    templateId: 4
                },
                {
                    layoutId: 11,
                    templateId: 4
                },
                {
                    layoutId: 12,
                    templateId: 4
                },
                {
                    layoutId: 25,
                    templateId: 4
                },
                {
                    layoutId: 26,
                    templateId: 4
                },
                {
                    layoutId: 27,
                    templateId: 4
                },

                {
                    layoutId: 7,
                    templateId: 5
                },
                {
                    layoutId: 8,
                    templateId: 5
                },
                {
                    layoutId: 9,
                    templateId: 5
                },
                {
                    layoutId: 22,
                    templateId: 5
                },
                {
                    layoutId: 23,
                    templateId: 5
                },
                {
                    layoutId: 24,
                    templateId: 5
                },

                {
                    layoutId: 7,
                    templateId: 6
                },
                {
                    layoutId: 8,
                    templateId: 6
                },
                {
                    layoutId: 9,
                    templateId: 6
                },
                {
                    layoutId: 22,
                    templateId: 6
                },
                {
                    layoutId: 23,
                    templateId: 6
                },
                {
                    layoutId: 24,
                    templateId: 6
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("layouts_templates", null, {});
    }
};
