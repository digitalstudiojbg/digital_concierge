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
            is_root: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: true
            },
            directory_list_id: DataTypes.INTEGER
        },
        {}
    );
    directory_list.associate = function(models) {
        directory_list.belongsTo(models.directory_list, {
            foreignKey: { allowNull: true }
        });
        directory_list.belongsToMany(models.system, {
            through: "directory_lists_systems"
        });
        directory_list.belongsToMany(models.media, {
            through: "directory_lists_media"
        });
        directory_list.belongsTo(models.layout, {
            foreignKey: { allowNull: true }
        });
        directory_list.belongsToMany(models.directory_entry, {
            through: "directory_entries_directory_lists"
        });
    };
    return directory_list;
};
