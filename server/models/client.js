"use strict";
module.exports = (sequelize, DataTypes) => {
    const client = sequelize.define(
        "client",
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
                }
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            has_tablet: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            has_touchscreen: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            number_of_users: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        },
        {}
    );
    client.associate = function(models) {
        client.hasMany(models.user);
        client.belongsToMany(models.department, {
            through: "clients_departments"
        });
        client.hasMany(models.room);
        client.hasMany(models.guest);
        client.hasMany(models.device);
        client.hasMany(models.system);
        client.hasMany(models.media);
    };
    return client;
};
