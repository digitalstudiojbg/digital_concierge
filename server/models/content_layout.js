"use strict";
module.exports = (sequelize, DataTypes) => {
    const content_layout = sequelize.define(
        "content_layout",
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
    content_layout.associate = function(models) {
        content_layout.belongsToMany(models.validation, {
            through: "content_layouts_validations"
        });
        content_layout.hasMany(models.tier);
    };
    return content_layout;
};
