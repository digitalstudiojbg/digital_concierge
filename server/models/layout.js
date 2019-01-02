"use strict";
module.exports = (sequelize, DataTypes) => {
    const layout = sequelize.define(
        "layout",
        {
            name: DataTypes.STRING
        },
        {}
    );
    layout.associate = function(models) {
        layout.belongsToMany(models.system, {
            through: "layouts_systems"
        });
        layout.hasMany(models.jbg_welcome);
        layout.hasMany(models.start);
        layout.hasMany(models.home);
    };
    return layout;
};
