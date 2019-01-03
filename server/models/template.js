"use strict";
module.exports = (sequelize, DataTypes) => {
    const template = sequelize.define(
        "template",
        {
            name: DataTypes.STRING
        },
        {}
    );
    template.associate = function(models) {
        template.belongsToMany(models.layout, {
            through: "layouts_templates"
        });
        template.belongsToMany(models.validation, {
            through: "templates_validations"
        });
    };
    return template;
};
