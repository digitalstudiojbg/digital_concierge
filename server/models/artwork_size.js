"use strict";
module.exports = (sequelize, DataTypes) => {
    const artwork_size = sequelize.define(
        "artwork_size",
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
    artwork_size.associate = function(models) {
        artwork_size.hasMany(models.advertising);
    };
    return artwork_size;
};
