"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "jbg_template_types",
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
        return queryInterface.bulkDelete("jbg_template_types", null, {});
    }
};
