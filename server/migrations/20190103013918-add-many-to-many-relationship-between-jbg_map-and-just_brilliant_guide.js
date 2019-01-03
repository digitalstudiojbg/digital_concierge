"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("jbg_maps_just_brilliant_guides", {
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
            jbgMapId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "jbg_maps",
                    key: "id"
                }
            },
            justBrilliantGuideId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "just_brilliant_guides",
                    key: "id"
                }
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("jbg_maps_just_brilliant_guides");
    }
};
