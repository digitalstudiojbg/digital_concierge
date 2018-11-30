"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "tb_directory_types_validations",
            [
                {
                    tbDirectoryTypeId: 1,
                    validationId: 1
                },
                {
                    tbDirectoryTypeId: 1,
                    validationId: 2
                },
                {
                    tbDirectoryTypeId: 1,
                    validationId: 3
                },
                {
                    tbDirectoryTypeId: 1,
                    validationId: 4
                },
                {
                    tbDirectoryTypeId: 2,
                    validationId: 1
                },
                {
                    tbDirectoryTypeId: 2,
                    validationId: 3
                },
                {
                    tbDirectoryTypeId: 2,
                    validationId: 4
                },
                {
                    tbDirectoryTypeId: 3,
                    validationId: 1
                },
                {
                    tbDirectoryTypeId: 3,
                    validationId: 3
                },
                {
                    tbDirectoryTypeId: 3,
                    validationId: 4
                },
                {
                    tbDirectoryTypeId: 4,
                    validationId: 2
                },
                {
                    tbDirectoryTypeId: 4,
                    validationId: 3
                },
                {
                    tbDirectoryTypeId: 4,
                    validationId: 4
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(
            "tb_directory_types_validations",
            null,
            {}
        );
    }
};
