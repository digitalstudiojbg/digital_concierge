"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("content_layouts_validations", {
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
            contentLayoutId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "content_layouts",
                    key: "id"
                }
            },
            validationId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "validations",
                    key: "id"
                }
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("content_layouts_validations");
    }
};
