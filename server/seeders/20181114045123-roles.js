"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface
            .bulkInsert(
                "roles",
                [
                    {
                        name: "admin",
                        is_admin: true
                    }
                ],
                {}
            )
            .then(() => {
                queryInterface.bulkInsert(
                    "roles",
                    [
                        {
                            name: "reception"
                        },
                        {
                            name: "concierge"
                        },
                        {
                            name: "it support"
                        }
                    ],
                    {}
                );
            });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("roles", null, {});
    }
};
