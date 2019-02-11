"use strict";
module.exports = (sequelize, DataTypes) => {
    const license_type = sequelize.define(
        "license_type",
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
    license_type.associate = function(models) {
        license_type.hasMany(models.license);
    };
    return license_type;
};
