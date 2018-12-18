"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("directories_tiers", {
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
            directoryId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "directories",
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
            }
        });
    },

    down: (queryInterface, _Sequelize) => {
        return queryInterface.dropTable("directories_tiers");
    }
};
