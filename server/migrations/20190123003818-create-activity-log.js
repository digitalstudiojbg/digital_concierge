"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("activity_logs", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            tableName: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            modelName: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            subjectId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            actionType: {
                type: Sequelize.ENUM("CREATE", "UPDATE", "DELETE"),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            properties: {
                type: Sequelize.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            ip: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            country: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "undefined"
            },
            region: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "undefined"
            },
            city: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "undefined"
            },
            latitude: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "undefined"
            },
            longitude: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "undefined"
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
    down: (queryInterface, _Sequelize) => {
        return queryInterface.dropTable("activity_logs");
    }
};
