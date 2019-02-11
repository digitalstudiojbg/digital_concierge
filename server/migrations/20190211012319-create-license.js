"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("licenses", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            key: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            commence_date: {
                type: Sequelize.DATE,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            expire_date: {
                type: Sequelize.DATE,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            auto_renewal: {
                type: Sequelize.BOOLEAN,
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
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("licenses");
    }
};
