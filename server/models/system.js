"use strict";
module.exports = (sequelize, DataTypes) => {
    const system = sequelize.define(
        "system",
        {
            name: DataTypes.STRING
        },
        {}
    );
    system.associate = function(models) {
        system.hasMany(models.device);
        system.belongsTo(models.client, {
            foreignKey: { allowNull: false }
        });
        system.belongsToMany(models.layout, {
            through: "layouts_systems"
        });
        system.belongsTo(models.just_brilliant_guide, {
            foreignKey: { allowNull: false }
        });
        system.belongsTo(models.start, {
            foreignKey: { allowNull: false }
        });
        system.belongsTo(models.home, {
            foreignKey: { allowNull: false }
        });
        system.belongsToMany(models.gallery, {
            through: "galleries_systems"
        });
        system.belongsToMany(models.map, {
            through: "maps_systems"
        });
        system.belongsToMany(models.directory_list, {
            through: "directory_lists_systems"
        });
    };
    return system;
};
