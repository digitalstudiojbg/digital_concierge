"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "jbg_layout_types",
            [
                {
                    name: "welcome"
                },
                {
                    name: "feature"
                },
                {
                    name: "information"
                },
                {
                    name: "map"
                },
                {
                    name: "gallery"
                },
                {
                    name: "market"
                },
                {
                    name: "food"
                },
                {
                    name: "attraction"
                },
                {
                    name: "event"
                },
                {
                    name: "essential"
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("jbg_layout_types", null, {});
    }
};
