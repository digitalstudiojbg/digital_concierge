"use strict";
module.exports = (sequelize, DataTypes) => {
    const directory_list = sequelize.define(
        "directory_list",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            description: DataTypes.TEXT,
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: true
            },
            is_root: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: false
            },
            order: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: 0
            },
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
            },
            directoryListId: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {}
    );
    directory_list.associate = function(models) {
        directory_list.belongsTo(models.directory_list, {
            foreignKey: { allowNull: true }
        });
        directory_list.belongsTo(models.system, {
            foreignKey: { allowNull: true }
        });
        directory_list.belongsToMany(models.media, {
            through: "directory_lists_media"
        });
        directory_list.belongsTo(models.layout, {
            foreignKey: { allowNull: true }
        });
        directory_list.belongsToMany(models.directory_entry, {
            through: models.directory_entries_directory_lists
        });
    };
    return directory_list;
};
