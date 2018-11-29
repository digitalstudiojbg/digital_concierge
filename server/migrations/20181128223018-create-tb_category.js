"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("tb_categories", {
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
            image: {
                type: Sequelize.STRING
            },
            has_directory: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: false
            },
            is_parent: {
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
            tbCategoryId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "tb_categories", // name of Target table
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
        return queryInterface.dropTable("tb_categories");
    }
};
