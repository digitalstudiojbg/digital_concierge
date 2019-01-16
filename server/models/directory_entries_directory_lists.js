"use strict";
module.exports = (sequelize, DataTypes) => {
    const directory_entries_directory_lists = sequelize.define(
        "directory_entries_directory_lists",
        {
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: true
            }
        },
        {}
    );
    directory_entries_directory_lists.associate = function(models) {
        directory_entries_directory_lists.belongsTo(models.directory_entry);
        directory_entries_directory_lists.belongsTo(models.directory_list);
    };
    return directory_entries_directory_lists;
};
