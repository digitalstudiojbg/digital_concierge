"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "articles",
            [
                {
                    name: "WELCOME TO PARADISE",
                    justBrilliantGuideId: 1,
                    order: 1,
                    jbgTemplateId: 1,
                    jbgLayoutId: 2
                },
                {
                    name: "WELKAM",
                    justBrilliantGuideId: 1,
                    order: 2,
                    jbgTemplateId: 2,
                    jbgLayoutId: 5
                },
                {
                    name: "IPSUM LOREM",
                    justBrilliantGuideId: 2,
                    order: 1,
                    jbgTemplateId: 1,
                    jbgLayoutId: 3
                },
                {
                    name: "SAFETY",
                    justBrilliantGuideId: 2,
                    order: 2,
                    jbgTemplateId: 2,
                    jbgLayoutId: 6
                },
                {
                    name: "ESSENTIAL SERVICES",
                    justBrilliantGuideId: 3,
                    order: 1,
                    jbgTemplateId: 10,
                    jbgLayoutId: 28
                },
                {
                    name: "CONCIERGE",
                    justBrilliantGuideId: 3,
                    order: 2,
                    jbgTemplateId: 3,
                    jbgLayoutId: 7
                },
                {
                    name: "POLICE STATION",
                    justBrilliantGuideId: 4,
                    order: 1,
                    jbgTemplateId: 10,
                    jbgLayoutId: 29
                },
                {
                    name: "EMBASSY",
                    justBrilliantGuideId: 4,
                    order: 2,
                    jbgTemplateId: 10,
                    jbgLayoutId: 30
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("articles", null, {});
    }
};
