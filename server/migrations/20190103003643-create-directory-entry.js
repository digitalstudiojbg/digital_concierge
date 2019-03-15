"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("directory_entries", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            title: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT("long")
            },
            start_date: {
                type: Sequelize.DATE
            },
            end_date: {
                type: Sequelize.DATE
            },
            phone: {
                type: Sequelize.STRING
            },
            opening_hours: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            colour1Hex: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "#FFFFFF"
            },
            colour1Alpha: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: 100
            },
            colour2Hex: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "#FFFFFF"
            },
            colour2Alpha: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: 100
            },
            colour3Hex: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "#FFFFFF"
            },
            colour3Alpha: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: 100
            },
            colour4Hex: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "#FFFFFF"
            },
            colour4Alpha: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: 100
            },
            colour5Hex: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "#FFFFFF"
            },
            colour5Alpha: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: 100
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
        return queryInterface.dropTable("directory_entries");
    }
};
