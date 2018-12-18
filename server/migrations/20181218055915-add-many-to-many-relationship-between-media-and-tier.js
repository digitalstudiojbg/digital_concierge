"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("media_tiers", {
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("NOW()")
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("NOW()")
            },
            mediumId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "media",
                    key: "id"
                }
            },
            tierId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "tiers",
                    key: "id"
                }
            },
            description: {
                type: Sequelize.STRING
            }
        });
    },

    down: (queryInterface, _Sequelize) => {
        return queryInterface.dropTable("media_tiers");
    }
};
