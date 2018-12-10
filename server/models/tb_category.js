"use strict";
module.exports = (sequelize, DataTypes) => {
    const tb_category = sequelize.define(
        "tb_category",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            image: {
                type: DataTypes.STRING
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: true
            },
            has_directory: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: false
            },

            tbCategoryId: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {}
    );
    tb_category.associate = function(models) {
        tb_category.belongsTo(models.tb_category, {
            foreignKey: { allowNull: true }
        });
        tb_category.belongsToMany(models.venue, {
            through: "tb_categories_venues"
        });
        /*tb_category.belongsToMany(models.tb_directory, {
            through: "tb_directories_tb_categories"
        });*/
        tb_category.belongsToMany(models.tb_directory, {
            through: models.tb_directories_tb_categories
        });

        tb_category.belongsTo(models.tb_directory_type, {
            foreignKey: { allowNull: false }
        });

        tb_category.belongsToMany(models.tb_media, {
            through: "tb_categories_tb_media"
        });
    };
    return tb_category;
};
