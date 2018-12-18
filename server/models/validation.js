"use strict";
module.exports = (sequelize, DataTypes) => {
    const validation = sequelize.define(
        "validation",
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
    validation.associate = function(models) {
        validation.belongsToMany(models.content_layout, {
            through: "content_layouts_validations"
        });
        validation.belongsToMany(models.content_list_layout, {
            through: "content_list_layouts_validations"
        });
        validation.belongsToMany(models.tier_layout, {
            through: "tier_layouts_validations"
        });
        validation.belongsToMany(models.landing_page_layout, {
            through: "landing_page_layouts_validations"
        });
    };
    return validation;
};
