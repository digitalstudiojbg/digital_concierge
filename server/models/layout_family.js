"use strict";
module.exports = (sequelize, DataTypes) => {
    const layout_family = sequelize.define(
        "layout_family",
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
    layout_family.associate = function(models) {
        layout_family.hasMany(models.layout);
    };
    return layout_family;
};
