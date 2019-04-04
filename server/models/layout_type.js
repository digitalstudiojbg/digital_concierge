"use strict";
module.exports = (sequelize, DataTypes) => {
    const layout_type = sequelize.define(
        "layout_type",
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
    layout_type.associate = function(models) {
        layout_type.hasMany(models.layout);
    };
    return layout_type;
};
