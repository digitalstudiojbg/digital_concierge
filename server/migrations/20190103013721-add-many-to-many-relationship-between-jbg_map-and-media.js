"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("jbg_maps_media", {
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

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("jbg_maps_media");
    }
};
