"use strict";
module.exports = (sequelize, DataTypes) => {
    const tb_directory_type = sequelize.define(
        "tb_directory_type",
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
    tb_directory_type.associate = function(models) {
        models.tb_directory_type.belongsToMany(models.validation, {
            through: "tb_directory_types_validations"
        });
        models.tb_directory_type.hasMany(models.tb_directory);
        models.tb_directory_type.hasMany(models.tb_category);
        models.tb_directory_type.hasMany(models.tb_landing_page);
    };
    return tb_directory_type;
};
