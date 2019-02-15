"use strict";
module.exports = (sequelize, DataTypes) => {
    const system = sequelize.define(
        "system",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            aif: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: true
            },
            numberOfDevices: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
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
            foreignKey: { allowNull: true }
        });
        system.belongsTo(models.start, {
            foreignKey: { allowNull: true }
        });
        system.belongsTo(models.home, {
            foreignKey: { allowNull: true }
        });
        system.belongsToMany(models.gallery, {
            through: "galleries_systems"
        });
        system.belongsToMany(models.map, {
            through: "maps_systems"
        });
        system.hasMany(models.directory_list);
        system.belongsToMany(models.media, {
            through: "media_systems"
        });
        system.hasOne(models.theme);
        system.belongsTo(models.device_type, {
            foreignKey: { allowNull: false }
        });
        system.belongsTo(models.system_type, {
            foreignKey: { allowNull: false }
        });
        system.belongsToMany(models.feature, {
            through: "features_systems"
        });
    };
    return system;
};
