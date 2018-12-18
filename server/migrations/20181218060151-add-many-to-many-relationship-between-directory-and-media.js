"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("directories_media", {
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
            directoryId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "directories",
                    key: "id"
                }
            },
            description: {
                type: Sequelize.STRING
            }
        });
    },

    down: (queryInterface, _Sequelize) => {
        return queryInterface.dropTable("directories_media");
    }
};
