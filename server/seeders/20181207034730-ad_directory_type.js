"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "ad_directory_types",
            [
                {
                    name: "TABLET_AD_DIRECTORY_TYPE_1"
                },
                {
                    name: "TABLET_AD_DIRECTORY_TYPE_2"
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("ad_directory_types", null, {});
    }
};
