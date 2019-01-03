"use strict";
module.exports = (sequelize, DataTypes) => {
    const jbg_directory_entry = sequelize.define(
        "jbg_directory_entry",
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
    jbg_directory_entry.associate = function(models) {
        jbg_directory_entry.belongsToMany(models.jbg_directory_list, {
            through: "jbg_directory_entries_jbg_directory_lists"
        });
        jbg_directory_entry.belongsTo(models.layout, {
            foreignKey: { allowNull: true }
        });
        jbg_directory_entry.belongsToMany(models.media, {
            through: "jbg_directory_entries_media"
        });
    };
    return jbg_directory_entry;
};
