"use strict";
module.exports = (sequelize, DataTypes) => {
    const feature = sequelize.define(
        "feature",
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
    feature.associate = function(models) {
        feature.belongsTo(models.feature_category, {
            foreignKey: { allowNull: false }
        });
        feature.belongsToMany(models.system, {
            through: "features_systems"
        });
    };
    return feature;
};
