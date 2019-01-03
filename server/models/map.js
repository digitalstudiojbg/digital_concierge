"use strict";
module.exports = (sequelize, DataTypes) => {
    const map = sequelize.define(
        "map",
        {
            name: DataTypes.STRING
        },
        {}
    );
    map.associate = function(models) {
        map.belongsTo(models.layout, {
            foreignKey: { allowNull: false }
        });
        map.belongsToMany(models.system, {
            through: "galleries_systems"
        });
        map.belongsToMany(models.media, {
            through: "galleries_media"
        });
    };
    return map;
};
