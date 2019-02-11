"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("contracts", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            number: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            file: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            agreement_date: {
                type: Sequelize.DATE,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            renewal_date: {
                type: Sequelize.DATE,
                allowNull: false,
                validate: {
                    notEmpty: true
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
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("NOW()")
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("NOW()")
            }
        });
    },
    down: queryInterface => {
        return queryInterface.dropTable("contracts");
    }
};
