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
    };
    return tb_category;
};
