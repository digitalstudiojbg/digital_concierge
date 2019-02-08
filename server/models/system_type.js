"use strict";
module.exports = (sequelize, DataTypes) => {
    const system_type = sequelize.define(
        "system_type",
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
    system_type.associate = function(models) {
        system_type.hasMany(models.system);
    };
    return system_type;
};
