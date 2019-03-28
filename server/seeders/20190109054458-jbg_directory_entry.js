"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "jbg_directory_entries",
            [
                {
                    name: "ADVERTISEMENT 1",
                    title: "ADVERTISEMENT 1",
                    layoutId: 1
                },
                {
                    name: "ADVERTISEMENT 2",
                    title: "ADVERTISEMENT 2",
                    layoutId: 1
                },
                {
                    name: "ADVERTISEMENT 3",
                    title: "ADVERTISEMENT 3",
                    layoutId: 2
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("jbg_directory_entries", null, {});
    }
};
