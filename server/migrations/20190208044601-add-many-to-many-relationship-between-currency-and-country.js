"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("countries_currencies", {
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
            currencyId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "currencies",
                    key: "id"
                }
            },
            countryId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "countries",
                    key: "id"
                }
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("countries_currencies");
    }
};
