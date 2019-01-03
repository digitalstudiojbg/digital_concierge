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
        media.belongsToMany(models.gallery, {
            through: "galleries_media"
        });
        media.belongsToMany(models.map, {
            through: "maps_media"
        });
        media.belongsToMany(models.directory_list, {
            through: "directory_lists_media"
        });
        media.belongsToMany(models.directory_entry, {
            through: "directory_entries_media"
        });
        media.belongsToMany(models.jbg_map, {
            through: "jbg_maps_media"
        });
        media.belongsToMany(models.jbg_directory_list, {
            through: "jbg_directory_lists_media"
        });
        media.belongsToMany(models.jbg_directory_list, {
            through: "jbg_directory_entries_media"
        });
    };
    return media;
};
