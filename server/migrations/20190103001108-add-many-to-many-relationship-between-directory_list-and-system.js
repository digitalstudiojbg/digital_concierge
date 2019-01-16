"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("directory_lists_systems", {
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
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: true
            },
            directoryListId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "directory_lists",
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

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("directory_lists_systems");
    }
};
