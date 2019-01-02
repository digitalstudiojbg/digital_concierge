"use strict";
module.exports = (sequelize, DataTypes) => {
    const group = sequelize.define(
        "group",
        {
            name: DataTypes.STRING
        },
        {}
    );
    group.associate = function(models) {
        group.belongsTo(models.client, {
            foreignKey: { allowNull: false }
        });
        group.hasMany(models.role);
    };
    return group;
};
