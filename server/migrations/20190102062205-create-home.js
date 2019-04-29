"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("homes", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            description: {
                type: Sequelize.TEXT
            },
            button_text: {
                type: Sequelize.TEXT
            },
            logoMediaId: {
                type: Sequelize.INTEGER
            },
            headerMediaId: {
                type: Sequelize.INTEGER
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
        return queryInterface.dropTable("homes");
    }
};
