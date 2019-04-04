"use strict";
module.exports = (sequelize, DataTypes) => {
    const template_type = sequelize.define(
        "template_type",
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
    template_type.associate = function(models) {
        template_type.hasMany(models.template);
    };
    return template_type;
};
