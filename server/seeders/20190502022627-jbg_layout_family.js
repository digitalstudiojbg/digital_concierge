"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "jbg_layout_families",
            [
                {
                    name: "TROPICAL",
                    mediumId: 65
                },
                {
                    name: "MINIMALIST",
                    mediumId: 64
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("jbg_layout_families", null, {});
    }
};
