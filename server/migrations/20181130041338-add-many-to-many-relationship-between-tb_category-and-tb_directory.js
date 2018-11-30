"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("tb_directories_tb_categories", {
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
            tbDirectoryId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "tb_directories",
                    key: "id"
                }
            },
            tbCategoryId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "tb_categories",
                    key: "id"
                }
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("tb_directories_tb_categories");
    }
};
