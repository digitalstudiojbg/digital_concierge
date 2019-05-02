"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "jbg_layouts_jbg_templates",
            [
                {
                    jbgLayoutId: 1,
                    jbgTemplateId: 1
                },
                {
                    jbgLayoutId: 2,
                    jbgTemplateId: 1
                },
                {
                    jbgLayoutId: 3,
                    jbgTemplateId: 1
                },
                {
                    jbgLayoutId: 4,
                    jbgTemplateId: 2
                },
                {
                    jbgLayoutId: 5,
                    jbgTemplateId: 2
                },
                {
                    jbgLayoutId: 6,
                    jbgTemplateId: 2
                },
                {
                    jbgLayoutId: 7,
                    jbgTemplateId: 3
                },
                {
                    jbgLayoutId: 8,
                    jbgTemplateId: 3
                },
                {
                    jbgLayoutId: 9,
                    jbgTemplateId: 3
                },
                {
                    jbgLayoutId: 10,
                    jbgTemplateId: 4
                },
                {
                    jbgLayoutId: 11,
                    jbgTemplateId: 4
                },
                {
                    jbgLayoutId: 12,
                    jbgTemplateId: 4
                },
                {
                    jbgLayoutId: 13,
                    jbgTemplateId: 5
                },
                {
                    jbgLayoutId: 14,
                    jbgTemplateId: 5
                },
                {
                    jbgLayoutId: 15,
                    jbgTemplateId: 5
                },
                {
                    jbgLayoutId: 16,
                    jbgTemplateId: 6
                },
                {
                    jbgLayoutId: 17,
                    jbgTemplateId: 6
                },
                {
                    jbgLayoutId: 18,
                    jbgTemplateId: 6
                },
                {
                    jbgLayoutId: 19,
                    jbgTemplateId: 7
                },
                {
                    jbgLayoutId: 20,
                    jbgTemplateId: 7
                },
                {
                    jbgLayoutId: 21,
                    jbgTemplateId: 7
                },
                {
                    jbgLayoutId: 22,
                    jbgTemplateId: 8
                },
                {
                    jbgLayoutId: 23,
                    jbgTemplateId: 8
                },
                {
                    jbgLayoutId: 24,
                    jbgTemplateId: 8
                },
                {
                    jbgLayoutId: 25,
                    jbgTemplateId: 9
                },
                {
                    jbgLayoutId: 26,
                    jbgTemplateId: 9
                },
                {
                    jbgLayoutId: 27,
                    jbgTemplateId: 9
                },
                {
                    jbgLayoutId: 28,
                    jbgTemplateId: 10
                },
                {
                    jbgLayoutId: 29,
                    jbgTemplateId: 10
                },
                {
                    jbgLayoutId: 30,
                    jbgTemplateId: 10
                },
                {
                    jbgLayoutId: 31,
                    jbgTemplateId: 1
                },
                {
                    jbgLayoutId: 32,
                    jbgTemplateId: 1
                },
                {
                    jbgLayoutId: 33,
                    jbgTemplateId: 1
                },
                {
                    jbgLayoutId: 34,
                    jbgTemplateId: 2
                },
                {
                    jbgLayoutId: 35,
                    jbgTemplateId: 2
                },
                {
                    jbgLayoutId: 36,
                    jbgTemplateId: 2
                },
                {
                    jbgLayoutId: 37,
                    jbgTemplateId: 3
                },
                {
                    jbgLayoutId: 38,
                    jbgTemplateId: 3
                },
                {
                    jbgLayoutId: 39,
                    jbgTemplateId: 3
                },
                {
                    jbgLayoutId: 40,
                    jbgTemplateId: 4
                },
                {
                    jbgLayoutId: 41,
                    jbgTemplateId: 4
                },
                {
                    jbgLayoutId: 42,
                    jbgTemplateId: 4
                },
                {
                    jbgLayoutId: 43,
                    jbgTemplateId: 5
                },
                {
                    jbgLayoutId: 44,
                    jbgTemplateId: 5
                },
                {
                    jbgLayoutId: 45,
                    jbgTemplateId: 5
                },
                {
                    jbgLayoutId: 46,
                    jbgTemplateId: 6
                },
                {
                    jbgLayoutId: 47,
                    jbgTemplateId: 6
                },
                {
                    jbgLayoutId: 48,
                    jbgTemplateId: 6
                },
                {
                    jbgLayoutId: 49,
                    jbgTemplateId: 7
                },
                {
                    jbgLayoutId: 50,
                    jbgTemplateId: 7
                },
                {
                    jbgLayoutId: 51,
                    jbgTemplateId: 7
                },
                {
                    jbgLayoutId: 52,
                    jbgTemplateId: 8
                },
                {
                    jbgLayoutId: 53,
                    jbgTemplateId: 8
                },
                {
                    jbgLayoutId: 54,
                    jbgTemplateId: 8
                },
                {
                    jbgLayoutId: 55,
                    jbgTemplateId: 9
                },
                {
                    jbgLayoutId: 56,
                    jbgTemplateId: 9
                },
                {
                    jbgLayoutId: 57,
                    jbgTemplateId: 9
                },
                {
                    jbgLayoutId: 58,
                    jbgTemplateId: 10
                },
                {
                    jbgLayoutId: 59,
                    jbgTemplateId: 10
                },
                {
                    jbgLayoutId: 60,
                    jbgTemplateId: 10
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("layouts_templates", null, {});
    }
};
