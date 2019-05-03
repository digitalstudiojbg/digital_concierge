"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "jbg_layout_families",
            [
                {
                    name: "TROPICAL",
                    mediumId: 1
                },
                {
                    name: "MINIMALIST",
                    mediumId: 1
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("jbg_layout_families", null, {});
    }
};
