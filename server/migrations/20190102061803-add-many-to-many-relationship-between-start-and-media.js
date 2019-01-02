"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("media_starts", {
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
            startId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "starts",
                    key: "id"
                }
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("tb_directories_tb_media");
    }
};
