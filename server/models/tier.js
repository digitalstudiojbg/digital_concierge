"use strict";
module.exports = (sequelize, DataTypes) => {
    const tier = sequelize.define(
        "tier",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
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
    tier.associate = function(models) {
        tier.belongsToMany(models.system, {
            through: "systems_tiers"
        });
    };
    return tier;
};
