"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "advertising_articles",
            [
                {
                    advertisingId: 1,
                    articleId: 1
                },
                {
                    advertisingId: 3,
                    articleId: 3
                },
                {
                    advertisingId: 4,
                    articleId: 4
                },
                {
                    advertisingId: 2,
                    articleId: 2
                }
            ],
            {}
        );
    },

    down: queryInterface => {
        return queryInterface.bulkDelete("advertising_articles", null, {});
    }
};
