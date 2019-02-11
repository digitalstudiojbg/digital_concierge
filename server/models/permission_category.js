"use strict";
module.exports = (sequelize, DataTypes) => {
    const permission_category = sequelize.define(
        "permission_category",
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
    permission_category.associate = function(models) {
        permission_category.hasMany(models.permission);
    };
    return permission_category;
};
