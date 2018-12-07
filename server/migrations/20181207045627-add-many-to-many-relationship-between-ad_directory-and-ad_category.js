"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("ad_directories_ad_categories", {
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

            adDirectoryId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "ad_directories",
                    key: "id"
                }
            },
            adCategoryId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "ad_categories",
                    key: "id"
                }
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("ad_directories_ad_categories");
    }
};
