"use strict";
module.exports = (sequelize, DataTypes) => {
    const directory_entry = sequelize.define(
        "directory_entry",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            title: DataTypes.STRING,
            description: DataTypes.TEXT("long"),
            start_date: DataTypes.DATE,
            end_date: DataTypes.DATE,
            phone: DataTypes.STRING,
            opening_hours: DataTypes.STRING,
            address: DataTypes.STRING,
            colour1Hex: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "#FFFFFF"
            },
            colour1Alpha: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: 100
            },
            colour2Hex: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "#FFFFFF"
            },
            colour2Alpha: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: 100
            },
            colour3Hex: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "#FFFFFF"
            },
            colour3Alpha: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: 100
            },
            colour4Hex: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "#FFFFFF"
            },
            colour4Alpha: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: 100
            },
            colour5Hex: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "#FFFFFF"
            },
            colour5Alpha: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: 100
            }
        },
        {}
    );
    directory_entry.associate = function(models) {
        directory_entry.belongsTo(models.layout, {
            foreignKey: { allowNull: true }
        });
        directory_entry.belongsToMany(models.media, {
            through: "directory_entries_media"
        });
        directory_entry.belongsToMany(models.directory_list, {
            through: models.directory_entries_directory_lists
        });
    };
    return directory_entry;
};
