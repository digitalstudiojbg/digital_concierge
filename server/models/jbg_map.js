"use strict";
module.exports = (sequelize, DataTypes) => {
    const jbg_map = sequelize.define(
        "jbg_map",
        {
            name: DataTypes.STRING
        },
        {}
    );
    jbg_map.associate = function(models) {
        jbg_map.belongsTo(models.layout, {
            foreignKey: { allowNull: false }
        });
        jbg_map.belongsToMany(models.system, {
            through: "jbg_maps_media"
        });
        jbg_map.belongsToMany(models.just_brilliant_guide, {
            through: "jbg_maps_just_brilliant_guides"
        });
    };
    return jbg_map;
};
