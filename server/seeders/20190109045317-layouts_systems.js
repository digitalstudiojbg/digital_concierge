"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "layouts_systems",
            [
                {
                    layoutId: 1,
                    systemId: 1
                },
                {
                    layoutId: 1,
                    systemId: 2
                },
                {
                    layoutId: 1,
                    systemId: 3
                },
                {
                    layoutId: 1,
                    systemId: 4
                },
                {
                    layoutId: 2,
                    systemId: 1
                },
                {
                    layoutId: 2,
                    systemId: 2
                },
                {
                    layoutId: 2,
                    systemId: 3
                },
                {
                    layoutId: 2,
                    systemId: 4
                },
                {
                    layoutId: 3,
                    systemId: 1
                },
                {
                    layoutId: 3,
                    systemId: 2
                },
                {
                    layoutId: 3,
                    systemId: 3
                },
                {
                    layoutId: 3,
                    systemId: 4
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("layouts_systems", null, {});
    }
};
