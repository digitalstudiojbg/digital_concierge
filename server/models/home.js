"use strict";
module.exports = (sequelize, DataTypes) => {
    const home = sequelize.define(
        "home",
        {
            description: DataTypes.TEXT,
            button_text: DataTypes.TEXT,
            logoMediaId: DataTypes.INTEGER,
            headerMediaId: DataTypes.INTEGER,
            colour1Hex: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            colour1Alpha: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            colour2Hex: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            colour2Alpha: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            colour3Hex: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            colour3Alpha: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            colour4Hex: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            colour4Alpha: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            colour5Hex: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            colour5Alpha: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        },
        {}
    );
    home.associate = function(models) {
        home.belongsTo(models.layout, {
            foreignKey: { allowNull: false }
        });
        home.belongsTo(models.template, {
            foreignKey: { allowNull: true }
        });
        home.hasMany(models.system);
        home.belongsToMany(models.media, {
            through: "homes_media"
        });
    };
    return home;
};
