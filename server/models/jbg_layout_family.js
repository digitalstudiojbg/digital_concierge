"use strict";
module.exports = (sequelize, DataTypes) => {
    const jbg_layout_family = sequelize.define(
        "jbg_layout_family",
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
    jbg_layout_family.associate = function(models) {
        jbg_layout_family.hasMany(models.jbg_layout);
        jbg_layout_family.belongsTo(models.media, {
            foreignKey: { allowNull: false }
        });
    };
    return jbg_layout_family;
};
