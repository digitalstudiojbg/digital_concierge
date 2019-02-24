"use strict";
module.exports = (sequelize, DataTypes) => {
    const activity_log = sequelize.define(
        "activity_log",
        {
            tableName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            modelName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            subjectId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "undefined"
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "undefined"
            },
            actionType: {
                type: DataTypes.ENUM("CREATE", "UPDATE", "DELETE"),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            properties: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            ip: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "undefined"
            },
            country: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "undefined"
            },
            region: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "undefined"
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "undefined"
            },
            latitude: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "undefined"
            },
            longitude: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "undefined"
            }
        },
        {}
    );
    activity_log.associate = function(models) {
        // activity_log.belongsTo(models.user, {
        //     foreignKey: { allowNull: false }
        // });
    };
    return activity_log;
};
