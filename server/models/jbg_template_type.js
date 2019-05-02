"use strict";
module.exports = (sequelize, DataTypes) => {
    const jbg_template_type = sequelize.define(
        "jbg_template_type",
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
    jbg_template_type.associate = function(models) {
        jbg_template_type.hasMany(models.jbg_template);
    };
    return jbg_template_type;
};
