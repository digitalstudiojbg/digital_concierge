"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("tb_categories_venues", {
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
            venueId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "venues",
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
        return queryInterface.dropTable("tb_categories_venues");
    }
};
