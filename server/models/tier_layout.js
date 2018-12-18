"use strict";
module.exports = (sequelize, DataTypes) => {
    const tier_layout = sequelize.define(
        "tier_layout",
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
    tier_layout.associate = function(models) {
        tier_layout.belongsToMany(models.validation, {
            through: "tier_layouts_validations"
        });
    };
    return tier_layout;
};
