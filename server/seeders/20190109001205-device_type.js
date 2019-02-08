"use strict";

module.exports = {
    up: (queryInterface, _Sequelize) => {
        return queryInterface.bulkInsert(
            "device_types",
            [
                {
                    name: '10.1" Android 8.1'
                },
                {
                    name: '27" Windows 10'
                },
                {
                    name: "Apple Mac Mini"
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("device_types", null, {});
    }
};
