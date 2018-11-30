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
            is_parent: {
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
        models.tb_category.belongsTo(models.tb_category, {
            foreignKey: { allowNull: true }
        });
        models.tb_category.belongsTo(models.venue);
        models.tb_category.belongsToMany(models.tb_directory, {
            through: "tb_directories_tb_categories"
        });
    };
    return tb_category;
};
