"use strict";
module.exports = (sequelize, DataTypes) => {
    const venue = sequelize.define(
        "venue",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            has_parent_category: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: true
            },
            has_tablet: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: false
            },
            has_touchscreen: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: false
            },
            number_of_users: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: 5
            },
            logo: {
                type: DataTypes.STRING
            }
        },
        {}
    );
    venue.associate = function(models) {
        venue.hasMany(models.user);
        venue.belongsToMany(models.role, { through: "roles_venues" });
        venue.belongsToMany(models.tb_category, {
            through: "tb_directories_venues"
        });

        //venue.hasMany(models.tb_category);
    };
    return venue;
};
