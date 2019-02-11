"use strict";
module.exports = (sequelize, DataTypes) => {
    const feature_category = sequelize.define(
        "feature_category",
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
    feature_category.associate = function(models) {
        feature_category.hasMany(models.feature);
    };
    return feature_category;
};
