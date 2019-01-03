"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("layouts_templates", {
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
            templateId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "templates",
                    key: "id"
                }
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("layouts_templates");
    }
};
