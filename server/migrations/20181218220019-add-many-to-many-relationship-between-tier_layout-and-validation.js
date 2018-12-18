"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("tier_layouts_validations", {
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
            tierLayoutId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "tier_layouts",
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
        return queryInterface.dropTable("tier_layouts_validations");
    }
};
