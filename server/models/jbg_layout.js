"use strict";
module.exports = (sequelize, DataTypes) => {
    const jbg_layout = sequelize.define(
        "jbg_layout",
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
    jbg_layout.associate = function(models) {
        jbg_layout.belongsTo(models.media, {
            foreignKey: { allowNull: false }
        });
        jbg_layout.belongsTo(models.jbg_layout_family, {
            foreignKey: { allowNull: false }
        });
        jbg_layout.belongsTo(models.jbg_layout_type, {
            foreignKey: { allowNull: false }
        });
        jbg_layout.belongsToMany(models.jbg_template, {
            through: "jbg_layouts_jbg_templates"
        });
    };
    return jbg_layout;
};
