"use strict";
module.exports = (sequelize, DataTypes) => {
    const directory_lists_systems = sequelize.define(
        "directory_lists_systems",
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
    directory_lists_systems.associate = function(models) {
        directory_lists_systems.belongsTo(models.system);
        directory_lists_systems.belongsTo(models.directory_list);
    };
    return directory_lists_systems;
};
