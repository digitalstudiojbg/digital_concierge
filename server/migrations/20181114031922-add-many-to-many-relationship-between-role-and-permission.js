"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("roles_permissions", {
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

            roleId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "roles",
                    key: "id"
                }
            },
            permissionId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "permissions",
                    key: "id"
                }
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("roles_permissions");
    }
};
