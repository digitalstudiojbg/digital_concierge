"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("roles_venues", {
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
            roleId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "roles",
                    key: "id"
                }
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("roles_venues");
    }
};
