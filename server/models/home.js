"use strict";
module.exports = (sequelize, DataTypes) => {
    const home = sequelize.define(
        "home",
        {
            name: DataTypes.STRING
        },
        {}
    );
    home.associate = function(models) {
        home.belongsTo(models.layout, {
            foreignKey: { allowNull: false }
        });
        home.hasMany(models.system);
        home.belongsToMany(models.media, {
            through: "homes_media"
        });
    };
    return home;
};
