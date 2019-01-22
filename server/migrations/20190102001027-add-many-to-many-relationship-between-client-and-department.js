"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("clients_departments", {
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
            clientId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "clients",
                    key: "id"
                }
            },
            departmentId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "departments",
                    key: "id"
                }
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("clients_departments");
    }
};
