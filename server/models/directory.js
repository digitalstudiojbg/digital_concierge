"use strict";
module.exports = (sequelize, DataTypes) => {
    const directory = sequelize.define(
        "directory",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            body: {
                type: DataTypes.TEXT("long"),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },

            image: DataTypes.STRING,
            phone: DataTypes.STRING,
            address: DataTypes.STRING,
            opening_hours: DataTypes.STRING
        },
        {}
    );
    directory.associate = function(models) {
        directory.belongsTo(models.content_layout, {
            foreignKey: { allowNull: false }
        });
        /*
        tb_directory.belongsToMany(models.tb_category, {
            through: "tb_directories_tb_categories"
        });
        */
        /*tb_directory.belongsToMany(models.tb_category, {
            through: models.tb_directories_tb_categories
        });*/
        /*
        tb_directory.belongsToMany(models.tb_category, {
            through: models.MoviePerson,
            foreignKey: 'movie_id',
            as: 'persons'
        });
        */
        /*tb_directory.belongsTo(models.tb_directory_type, {
            foreignKey: { allowNull: false }
        });

        tb_directory.belongsToMany(models.tb_media, {
            through: "tb_directories_tb_media"
        });*/
        directory.belongsToMany(models.media, {
            through: "directories_media"
        });
    };
    return directory;
};
