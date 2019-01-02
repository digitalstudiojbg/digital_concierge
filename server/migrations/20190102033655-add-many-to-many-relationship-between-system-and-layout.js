"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("layouts_systems", {
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
            layoutId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "layouts",
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
            },
            pin: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: true
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("layouts_systems");
    }
};
