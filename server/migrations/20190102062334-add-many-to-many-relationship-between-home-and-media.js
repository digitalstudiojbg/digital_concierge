"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("homes_media", {
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
            homeId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "homes",
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
        return queryInterface.dropTable("tb_directories_tb_media");
    }
};
