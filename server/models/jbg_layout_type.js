"use strict";
module.exports = (sequelize, DataTypes) => {
    const jbg_layout_type = sequelize.define(
        "jbg_layout_type",
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
    jbg_layout_type.associate = function(models) {
        jbg_layout_type.hasMany(models.jbg_layout);
    };
    return jbg_layout_type;
};
