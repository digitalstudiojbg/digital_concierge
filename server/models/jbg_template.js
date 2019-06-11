"use strict";
module.exports = (sequelize, DataTypes) => {
    const jbg_template = sequelize.define(
        "jbg_template",
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
    jbg_template.associate = function(models) {
        jbg_template.belongsTo(models.jbg_template_type, {
            foreignKey: { allowNull: false }
        });
        jbg_template.belongsToMany(models.jbg_layout, {
            through: "jbg_layouts_jbg_templates"
        });
        jbg_template.belongsToMany(models.validation, {
            through: "jbg_templates_validations"
        });
        jbg_template.hasMany(models.article);
    };
    return jbg_template;
};
