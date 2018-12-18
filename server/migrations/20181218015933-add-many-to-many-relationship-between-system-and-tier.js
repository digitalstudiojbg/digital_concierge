"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("systems_tiers", {
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
            systemId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "systems",
                    key: "id"
                }
            },
            tierId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "tiers",
                    key: "id"
                }
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: true
            },
            is_parent: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: false
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("systems_tiers");
    }
};
