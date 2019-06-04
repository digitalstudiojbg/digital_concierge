"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "artwork_sizes",
            [
                {
                    name: "200px x 500px"
                },
                {
                    name: "1024px x 768px"
                }
            ],
            {}
        );
    },
    down: queryInterface => {
        return queryInterface.bulkDelete("artwork_sizes", null, {});
    }
};
