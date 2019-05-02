"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "jbg_templates_validations",
            [
                {
                    jbgTemplateId: 1,
                    validationId: 5
                },
                {
                    jbgTemplateId: 1,
                    validationId: 6
                },
                {
                    jbgTemplateId: 1,
                    validationId: 7
                },
                {
                    jbgTemplateId: 1,
                    validationId: 8
                },
                {
                    jbgTemplateId: 1,
                    validationId: 9
                },
                {
                    jbgTemplateId: 2,
                    validationId: 5
                },
                {
                    jbgTemplateId: 2,
                    validationId: 6
                },
                {
                    jbgTemplateId: 2,
                    validationId: 7
                },
                {
                    jbgTemplateId: 2,
                    validationId: 8
                },
                {
                    jbgTemplateId: 2,
                    validationId: 9
                },
                {
                    jbgTemplateId: 3,
                    validationId: 5
                },
                {
                    jbgTemplateId: 3,
                    validationId: 6
                },
                {
                    jbgTemplateId: 3,
                    validationId: 7
                },
                {
                    jbgTemplateId: 3,
                    validationId: 8
                },
                {
                    jbgTemplateId: 3,
                    validationId: 9
                },
                {
                    jbgTemplateId: 3,
                    validationId: 1
                },
                {
                    jbgTemplateId: 3,
                    validationId: 2
                },
                {
                    jbgTemplateId: 3,
                    validationId: 3
                },
                {
                    jbgTemplateId: 3,
                    validationId: 4
                },
                {
                    jbgTemplateId: 4,
                    validationId: 5
                },
                {
                    jbgTemplateId: 4,
                    validationId: 6
                },
                {
                    jbgTemplateId: 4,
                    validationId: 7
                },
                {
                    jbgTemplateId: 4,
                    validationId: 8
                },
                {
                    jbgTemplateId: 4,
                    validationId: 9
                },
                {
                    jbgTemplateId: 4,
                    validationId: 1
                },
                {
                    jbgTemplateId: 4,
                    validationId: 2
                },
                {
                    jbgTemplateId: 4,
                    validationId: 3
                },
                {
                    jbgTemplateId: 4,
                    validationId: 4
                }
            ],
            {}
        );
    },

    down: queryInterface => {
        return queryInterface.bulkDelete("jbg_templates_validations", null, {});
    }
};
