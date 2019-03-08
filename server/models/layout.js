"use strict";
module.exports = (sequelize, DataTypes) => {
    const layout = sequelize.define(
        "layout",
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
    layout.associate = function(models) {
        layout.belongsToMany(models.system, {
            through: "layouts_systems"
        });
        layout.hasMany(models.jbg_welcome);
        layout.hasMany(models.start);
        layout.hasMany(models.home);
        layout.hasMany(models.gallery);
        layout.hasMany(models.map);
        layout.belongsToMany(models.template, {
            through: "layouts_templates"
        });
        layout.hasMany(models.directory_list);
        layout.hasMany(models.directory_entry);
        layout.hasMany(models.jbg_map);
        layout.hasMany(models.jbg_directory_list);
        layout.hasMany(models.jbg_directory_entry);
        layout.belongsTo(models.media, {
            foreignKey: { allowNull: false }
        });
        layout.belongsTo(models.layout_family, {
            foreignKey: { allowNull: false }
        });
    };
    return layout;
};
