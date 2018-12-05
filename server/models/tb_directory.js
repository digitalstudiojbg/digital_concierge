"use strict";
module.exports = (sequelize, DataTypes) => {
    const tb_directory = sequelize.define(
        "tb_directory",
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
    tb_directory.associate = function(models) {
        /*
        tb_directory.belongsToMany(models.tb_category, {
            through: "tb_directories_tb_categories"
        });
        */
        tb_directory.belongsToMany(models.tb_category, {
            through: models.tb_directories_tb_categories
        });

        /*
        tb_directory.belongsToMany(models.tb_category, {
    through: models.MoviePerson,
    foreignKey: 'movie_id',
    as: 'persons'
});
        */

        tb_directory.belongsTo(models.tb_directory_type, {
            foreignKey: { allowNull: false }
        });
    };
    return tb_directory;
};
