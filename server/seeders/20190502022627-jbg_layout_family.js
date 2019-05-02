"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "jbg_layout_families",
            [
                {
                    name: "TROPICAL"
                },
                {
                    name: "MINIMALIST"
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("jbg_layout_families", null, {});
    }
};
