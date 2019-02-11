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
            full_company_name: DataTypes.STRING,
            nature_of_business: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            venue_address: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            venue_city: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            venue_zip_code: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            postal_address: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            postal_city: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            postal_zip_code: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isEmail: true
                }
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: true
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
        client.hasMany(models.contact);
        client.hasMany(models.contract);
        client.belongsTo(models.state, {
            foreignKey: "venueStateId"
        });
        client.belongsTo(models.state, {
            foreignKey: "postalStateId"
        });
        client.hasMany(models.payment);
        client.hasMany(models.license);
    };
    return client;
};
