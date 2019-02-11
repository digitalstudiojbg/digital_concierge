"use strict";

module.exports = {
    up: (queryInterface, _Sequelize) => {
        return queryInterface.bulkInsert(
            "system_types",
            [
                {
                    name: "COMPENDIUM TABLET"
                },
                {
                    name: "COMPENDIUM TOUCH SCREEN"
                },
                {
                    name: "COMPENDIUM COMPUTER"
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("system_types", null, {});
    }
};
