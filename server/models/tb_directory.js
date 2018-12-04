"use strict";
module.exports = (sequelize, DataTypes) => {
    const tb_directory = sequelize.define(
        "tb_directory",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            body: {
                type: DataTypes.TEXT("long"),
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
            image: DataTypes.STRING,
            phone: DataTypes.STRING,
            address: DataTypes.STRING,
            opening_hours: DataTypes.STRING
        },
        {}
    );
    tb_directory.associate = function(models) {
        tb_directory.belongsToMany(models.tb_category, {
            through: "tb_directories_tb_categories"
        });
        tb_directory.belongsTo(models.tb_directory_type, {
            foreignKey: { allowNull: false }
        });
    };
    return tb_directory;
};
