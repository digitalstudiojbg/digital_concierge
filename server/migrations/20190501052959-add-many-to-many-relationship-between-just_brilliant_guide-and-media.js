"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("just_brilliant_guides_media", {
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
            justBrilliantGuideId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "just_brilliant_guides",
                    key: "id"
                }
            },
            mediumId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "media",
                    key: "id"
                }
            }
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable("features_systems");
    }
};
