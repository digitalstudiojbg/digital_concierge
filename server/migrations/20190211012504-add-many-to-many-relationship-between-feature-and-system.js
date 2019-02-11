"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("features_systems", {
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
            featureId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "features",
                    key: "id"
                }
            },
            systemId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "systems",
                    key: "id"
                }
            }
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable("features_systems");
    }
};
