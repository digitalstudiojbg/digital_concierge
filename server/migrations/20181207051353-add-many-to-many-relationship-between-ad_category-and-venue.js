"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("ad_categories_venues", {
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
        return queryInterface.dropTable("ad_categories_venues");
    }
};
