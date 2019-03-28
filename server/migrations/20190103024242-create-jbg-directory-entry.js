"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("jbg_directory_entries", {
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
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            description: {
                type: Sequelize.TEXT
            },
            order: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: 0
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
        return queryInterface.dropTable("jbg_directory_entries");
    }
};
