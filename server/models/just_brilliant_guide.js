"use strict";
module.exports = (sequelize, DataTypes) => {
    const just_brilliant_guide = sequelize.define(
        "just_brilliant_guide",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        },
        {}
    );
    just_brilliant_guide.associate = function(models) {
        just_brilliant_guide.belongsTo(models.jbg_welcome, {
            foreignKey: { allowNull: false }
        });
        just_brilliant_guide.hasMany(models.system);
        just_brilliant_guide.belongsToMany(models.jbg_map, {
            through: "jbg_maps_just_brilliant_guides"
        });
    };
    return just_brilliant_guide;
};
