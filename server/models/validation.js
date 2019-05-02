"use strict";
module.exports = (sequelize, DataTypes) => {
    const validation = sequelize.define(
        "validation",
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
    validation.associate = function(models) {
        validation.belongsToMany(models.template, {
            through: "templates_validations"
        });
        validation.belongsToMany(models.jbg_template, {
            through: "jbg_templates_validations"
        });
    };
    return validation;
};
