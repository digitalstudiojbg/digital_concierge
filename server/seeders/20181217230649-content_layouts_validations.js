"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "content_layouts_validations",
            [
                {
                    contentLayoutId: 1,
                    validationId: 1
                },
                {
                    contentLayoutId: 1,
                    validationId: 2
                },
                {
                    contentLayoutId: 1,
                    validationId: 3
                },
                {
                    contentLayoutId: 1,
                    validationId: 4
                },
                {
                    contentLayoutId: 2,
                    validationId: 1
                },
                {
                    contentLayoutId: 2,
                    validationId: 3
                },
                {
                    contentLayoutId: 2,
                    validationId: 4
                },
                {
                    contentLayoutId: 3,
                    validationId: 1
                },
                {
                    contentLayoutId: 3,
                    validationId: 3
                },
                {
                    contentLayoutId: 3,
                    validationId: 4
                },
                {
                    contentLayoutId: 4,
                    validationId: 2
                },
                {
                    contentLayoutId: 4,
                    validationId: 3
                },
                {
                    contentLayoutId: 4,
                    validationId: 4
                },
                {
                    contentLayoutId: 5,
                    validationId: 5
                },
                {
                    contentLayoutId: 5,
                    validationId: 6
                },
                {
                    contentLayoutId: 5,
                    validationId: 7
                },
                {
                    contentLayoutId: 5,
                    validationId: 8
                },
                {
                    contentLayoutId: 5,
                    validationId: 9
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(
            "content_layouts_validations",
            null,
            {}
        );
    }
};
