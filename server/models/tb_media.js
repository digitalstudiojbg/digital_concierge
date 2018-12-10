"use strict";
module.exports = (sequelize, DataTypes) => {
    const tb_media = sequelize.define(
        "tb_media",
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
    tb_media.associate = function(models) {
        tb_media.belongsTo(models.venue, {
            foreignKey: { allowNull: false }
        });

        tb_media.belongsToMany(models.tb_directory, {
            through: "tb_directories_tb_media"
        });

        tb_media.belongsToMany(models.tb_landing_page, {
            through: "tb_landing_pages_tb_media"
        });

        tb_media.belongsToMany(models.tb_category, {
            through: "tb_categories_tb_media"
        });
    };
    return tb_media;
};
