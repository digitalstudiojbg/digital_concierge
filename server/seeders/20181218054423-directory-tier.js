"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface
            .bulkInsert(
                "directories_tiers",
                [
                    {
                        directoryId: 1,
                        tierId: 6
                    },
                    {
                        directoryId: 2,
                        tierId: 6
                    },
                    {
                        directoryId: 3,
                        tierId: 10
                    },
                    {
                        directoryId: 4,
                        tierId: 11
                    },
                    {
                        directoryId: 5,
                        tierId: 10
                    }
                ],
                {}
            )
            .then(() => {
                queryInterface.bulkInsert(
                    "directories_tiers",
                    [
                        {
                            directoryId: 3,
                            tierId: 12,
                            active: false
                        },
                        {
                            directoryId: 4,
                            tierId: 10,
                            active: false
                        }
                    ],
                    {}
                );
            });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("directories_tiers", null, {});
    }
};
