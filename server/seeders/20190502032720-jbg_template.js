"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "jbg_templates",
            [
                {
                    name: "WELCOME PAGE",
                    jbgTemplateTypeId: 1
                },
                {
                    name: "HOME PAGE",
                    jbgTemplateTypeId: 2
                },
                {
                    name: "FEATURED PAGE",
                    jbgTemplateTypeId: 3
                },
                {
                    name: "INFORMATION PAGE",
                    jbgTemplateTypeId: 3
                },
                {
                    name: "MAP PAGE",
                    jbgTemplateTypeId: 4
                },
                {
                    name: "GALLERY PAGE",
                    jbgTemplateTypeId: 4
                },
                {
                    name: "MARKETS PAGE",
                    jbgTemplateTypeId: 4
                },
                {
                    name: "FOOD & DINING PAGE",
                    jbgTemplateTypeId: 4
                },
                {
                    name: "ATTRACTIONS PAGE",
                    jbgTemplateTypeId: 4
                },
                {
                    name: "CALENDAR OF EVENTS PAGE",
                    jbgTemplateTypeId: 4
                },
                {
                    name: "ESSENTIAL SERVICE PAGE",
                    jbgTemplateTypeId: 4
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("jbg_templates", null, {});
    }
};
