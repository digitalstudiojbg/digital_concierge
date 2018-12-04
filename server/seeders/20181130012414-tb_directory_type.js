"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "tb_directory_types",
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
                },
                {
                    name: "TABLET_LANDING_PAGE_TYPE_1"
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("tb_directory_types", null, {});
    }
};
