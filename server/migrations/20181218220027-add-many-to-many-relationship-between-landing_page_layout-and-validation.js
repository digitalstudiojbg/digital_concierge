"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("landing_page_layouts_validations", {
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
            landingPageLayoutId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "landing_page_layouts",
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
        return queryInterface.dropTable("landing_page_layouts_validations");
    }
};
