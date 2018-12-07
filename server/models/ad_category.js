"use strict";
module.exports = (sequelize, DataTypes) => {
    const ad_category = sequelize.define(
        "ad_category",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: true
            },
            is_parent: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: true
            }
        },
        {}
    );
    ad_category.associate = function(models) {
        ad_category.belongsToMany(models.ad_directory, {
            through: "ad_directories_ad_categories"
        });
        ad_category.belongsToMany(models.venue, {
            through: "ad_categories_venues"
        });
    };
    return ad_category;
};
