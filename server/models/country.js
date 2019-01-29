"use strict";
module.exports = (sequelize, DataTypes) => {
    const country = sequelize.define(
        "country",
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
    country.associate = function(models) {
        country.hasMany(models.state);
    };
    return country;
};
