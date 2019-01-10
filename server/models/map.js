"use strict";
module.exports = (sequelize, DataTypes) => {
    const map = sequelize.define(
        "map",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        },
        {}
    );
    map.associate = function(models) {
        map.belongsTo(models.layout, {
            foreignKey: { allowNull: false }
        });
        map.belongsToMany(models.system, {
            through: "maps_systems"
        });
        map.belongsToMany(models.media, {
            through: "galleries_media"
        });
    };
    return map;
};
