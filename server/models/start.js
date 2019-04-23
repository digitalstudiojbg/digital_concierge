"use strict";
module.exports = (sequelize, DataTypes) => {
    const start = sequelize.define(
        "start",
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
    start.associate = function(models) {
        start.belongsTo(models.layout, {
            foreignKey: { allowNull: false }
        });
        start.belongsTo(models.template, {
            foreignKey: { allowNull: true }
        });
        start.hasMany(models.system);
        start.belongsToMany(models.media, {
            through: "media_starts",
            as: "mediaStart"
        });
    };
    return start;
};
