"use strict";
module.exports = (sequelize, DataTypes) => {
    const device_type = sequelize.define(
        "device_type",
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
    device_type.associate = function(models) {
        device_type.hasMany(models.system);
    };
    return device_type;
};
