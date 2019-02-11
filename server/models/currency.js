"use strict";
module.exports = (sequelize, DataTypes) => {
    const currency = sequelize.define(
        "currency",
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
    currency.associate = function(models) {
        currency.belongsToMany(models.country, {
            through: "countries_currencies"
        });
        currency.hasMany(models.payment);
    };
    return currency;
};
