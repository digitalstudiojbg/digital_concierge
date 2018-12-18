"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "content_layouts",
            [
                {
                    name: "TABLET_DIRECTORY_TYPE_1"
                },
                {
                    name: "TABLET_DIRECTORY_TYPE_2"
                },
                {
                    name: "TABLET_DIRECTORY_TYPE_3"
                },
                {
                    name: "TABLET_DIRECTORY_TYPE_4"
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("content_layouts", null, {});
    }
};
