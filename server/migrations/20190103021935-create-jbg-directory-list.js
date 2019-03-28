"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("jbg_directory_lists", {
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
            is_root: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: false
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: true
            },
            order: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: 0
            },
            jbgDirectoryListId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "jbg_directory_lists", // name of Target table
                    key: "id" // key in Target table that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
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
        return queryInterface.dropTable("jbg_directory_lists");
    }
};
