"use strict";
module.exports = (sequelize, DataTypes) => {
    const group = sequelize.define(
        "group",
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
    group.associate = function(models) {
        group.belongsTo(models.client, {
            foreignKey: { allowNull: false }
        });
        group.hasMany(models.role);
    };
    return group;
};
