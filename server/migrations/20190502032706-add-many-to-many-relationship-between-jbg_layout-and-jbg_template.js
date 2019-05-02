"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("jbg_layouts_jbg_templates", {
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
            jbgLayoutId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "jbg_layouts",
                    key: "id"
                }
            },
            jbgTemplateId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "jbg_templates",
                    key: "id"
                }
            }
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable("jbg_layouts_jbg_templates");
    }
};
