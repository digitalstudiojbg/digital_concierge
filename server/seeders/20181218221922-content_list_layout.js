"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "content_list_layouts",
            [
                {
                    name: "TABLET_CONTENT_LIST_TYPE_1"
                },
                {
                    name: "TABLET_CONTENT_LIST_TYPE_2"
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("content_list_layouts", null, {});
    }
};
