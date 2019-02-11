"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "features",
            [
                {
                    name: "STANDARD ENTRY",
                    featureCategoryId: 1
                },
                {
                    name: "GALLERY FEATURE",
                    featureCategoryId: 1
                },
                {
                    name: "POP UPS",
                    featureCategoryId: 1
                },
                {
                    name: "EVENT REMINDER",
                    featureCategoryId: 1
                },
                {
                    name: "ADMIN",
                    featureCategoryId: 1
                },
                {
                    name: "ORDER FOOD",
                    featureCategoryId: 2
                },
                {
                    name: "ROOM REQUESTS",
                    featureCategoryId: 2
                },
                {
                    name: "AFTER HOURS",
                    featureCategoryId: 2
                },
                {
                    name: "INTERACTIVE MENUS",
                    featureCategoryId: 2
                },
                {
                    name: "ORDER SYSTEM",
                    featureCategoryId: 2
                }
            ],
            {}
        );
    },

    down: queryInterface => {
        return queryInterface.bulkDelete("features", null, {});
    }
};
