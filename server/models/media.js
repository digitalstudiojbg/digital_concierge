"use strict";
module.exports = (sequelize, DataTypes) => {
    const media = sequelize.define(
        "media",
        {
            path: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            type: {
                type: DataTypes.ENUM("image", "video"),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        },
        {}
    );
    media.associate = function(models) {
        media.belongsTo(models.venue, {
            foreignKey: { allowNull: false }
        });
        media.belongsToMany(models.ad_directory, {
            through: "ad_directories_media"
        });
        media.belongsToMany(models.ad_category, {
            through: "ad_categories_media"
        });
    };
    return media;
};
