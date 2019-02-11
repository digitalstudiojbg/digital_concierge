"use strict";

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            "features_systems",
            [
                {
                    featureId: 1,
                    systemId: 3
                },
                {
                    featureId: 2,
                    systemId: 3
                },
                {
                    featureId: 3,
                    systemId: 3
                },
                {
                    featureId: 4,
                    systemId: 3
                },
                {
                    featureId: 5,
                    systemId: 3
                },
                {
                    featureId: 6,
                    systemId: 3
                },
                {
                    featureId: 7,
                    systemId: 3
                },
                {
                    featureId: 8,
                    systemId: 3
                },
                {
                    featureId: 9,
                    systemId: 3
                },
                {
                    featureId: 10,
                    systemId: 3
                }
            ],
            {}
        );
    },

    down: queryInterface => {
        return queryInterface.bulkDelete("features_systems", null, {});
    }
};
