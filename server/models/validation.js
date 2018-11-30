"use strict";
module.exports = (sequelize, DataTypes) => {
    const validation = sequelize.define(
        "validation",
        {
            name: {
                type: sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        },
        {}
    );
    validation.associate = function(models) {
        models.validation.belongsToMany(models.tb_directory_type, {
            through: "tb_directory_types_validations"
        });
    };
    return validation;
};
