"use strict";
module.exports = (sequelize, DataTypes) => {
    const media = sequelize.define(
        "media",
        {
            name: DataTypes.STRING,
            path: DataTypes.STRING,
            type: DataTypes.STRING
        },
        {}
    );
    media.associate = function(models) {
        media.belongsToMany(models.jbg_welcome, {
            through: "jbg_welcomes_media"
        });
        media.belongsToMany(models.start, {
            through: "media_starts"
        });
        media.belongsToMany(models.start, {
            through: "homes_media"
        });
    };
    return media;
};
