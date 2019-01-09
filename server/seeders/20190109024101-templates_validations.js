"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "templates_validations",
            [
                {
                    templateId: 1,
                    validationId: 5
                },
                {
                    templateId: 1,
                    validationId: 6
                },
                {
                    templateId: 1,
                    validationId: 7
                },
                {
                    templateId: 1,
                    validationId: 8
                },
                {
                    templateId: 1,
                    validationId: 9
                },
                {
                    templateId: 2,
                    validationId: 5
                },
                {
                    templateId: 2,
                    validationId: 6
                },
                {
                    templateId: 2,
                    validationId: 7
                },
                {
                    templateId: 2,
                    validationId: 8
                },
                {
                    templateId: 2,
                    validationId: 9
                },
                {
                    templateId: 3,
                    validationId: 5
                },
                {
                    templateId: 3,
                    validationId: 6
                },
                {
                    templateId: 3,
                    validationId: 7
                },
                {
                    templateId: 3,
                    validationId: 8
                },
                {
                    templateId: 3,
                    validationId: 9
                },
                {
                    templateId: 3,
                    validationId: 1
                },
                {
                    templateId: 3,
                    validationId: 2
                },
                {
                    templateId: 3,
                    validationId: 3
                },
                {
                    templateId: 3,
                    validationId: 4
                },
                {
                    templateId: 4,
                    validationId: 5
                },
                {
                    templateId: 4,
                    validationId: 6
                },
                {
                    templateId: 4,
                    validationId: 7
                },
                {
                    templateId: 4,
                    validationId: 8
                },
                {
                    templateId: 4,
                    validationId: 9
                },
                {
                    templateId: 4,
                    validationId: 1
                },
                {
                    templateId: 4,
                    validationId: 2
                },
                {
                    templateId: 4,
                    validationId: 3
                },
                {
                    templateId: 4,
                    validationId: 4
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("templates_validations", null, {});
    }
};
