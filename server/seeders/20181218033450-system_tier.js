"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface
            .bulkInsert(
                "systems_tiers",
                [
                    {
                        tierId: 1,
                        systemId: 4
                    },
                    {
                        tierId: 2,
                        systemId: 4
                    },
                    {
                        tierId: 3,
                        systemId: 4
                    },
                    {
                        tierId: 4,
                        systemId: 4
                    }
                ],
                {}
            )
            .then(() => {
                queryInterface.bulkInsert(
                    "systems_tiers",
                    [
                        {
                            tierId: 5,
                            systemId: 4
                        },
                        {
                            tierId: 6,
                            systemId: 4
                        },
                        {
                            tierId: 7,
                            systemId: 4
                        },
                        {
                            tierId: 8,
                            systemId: 4
                        },
                        {
                            tierId: 9,
                            systemId: 4
                        },
                        {
                            tierId: 10,
                            systemId: 4
                        },
                        {
                            tierId: 11,
                            systemId: 4
                        },
                        {
                            tierId: 12,
                            systemId: 4
                        }
                    ],
                    {}
                );
            });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("systems_tiers", null, {});
    }
};
