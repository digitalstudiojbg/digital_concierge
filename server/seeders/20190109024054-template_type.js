"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "template_types",
            [
                {
                    name: "start"
                },
                {
                    name: "home"
                },
                {
                    name: "list"
                },
                {
                    name: "entry"
                },
                {
                    name: "promotion"
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("template_types", null, {});
    }
};
