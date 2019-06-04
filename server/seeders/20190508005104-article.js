"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "articles",
            [
                {
                    name: "WELCOME TO PARADISE",
                    justBrilliantGuideId: 1
                },
                {
                    name: "WELKAM",
                    justBrilliantGuideId: 1
                },
                {
                    name: "IPSUM LOREM",
                    justBrilliantGuideId: 2
                },
                {
                    name: "SAFETY",
                    justBrilliantGuideId: 2
                },
                {
                    name: "ESSENTIAL SERVICES",
                    justBrilliantGuideId: 3
                },
                {
                    name: "CONCIERGE",
                    justBrilliantGuideId: 3
                },
                {
                    name: "POLICE STATION",
                    justBrilliantGuideId: 4
                },
                {
                    name: "EMBASSY",
                    justBrilliantGuideId: 4
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("articles", null, {});
    }
};
