"use strict";
module.exports = (sequelize, DataTypes) => {
    const directory_entry = sequelize.define(
        "directory_entry",
        {
            name: DataTypes.STRING,
            title: DataTypes.STRING,
            description: DataTypes.TEXT,
            start_date: DataTypes.DATE,
            end_date: DataTypes.DATE,
            phone: DataTypes.STRING,
            opening_hours: DataTypes.STRING,
            address: DataTypes.STRING
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
            through: "directory_entries_directory_lists"
        });
    };
    return directory_entry;
};
