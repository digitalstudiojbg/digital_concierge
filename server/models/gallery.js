"use strict";
module.exports = (sequelize, DataTypes) => {
    const gallery = sequelize.define(
        "gallery",
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
    gallery.associate = function(models) {
        gallery.belongsTo(models.layout, {
            foreignKey: { allowNull: false }
        });
        gallery.belongsToMany(models.system, {
            through: "galleries_systems"
        });
        gallery.belongsToMany(models.media, {
            through: "galleries_media"
        });
    };
    return gallery;
};
