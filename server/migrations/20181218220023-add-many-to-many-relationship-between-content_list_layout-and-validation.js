"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("content_list_layouts_validations", {
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
            contentListLayoutId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "content_list_layouts",
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
        return queryInterface.dropTable("content_list_layouts_validations");
    }
};
