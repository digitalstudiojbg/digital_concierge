"use strict";
module.exports = (sequelize, DataTypes) => {
    const advertiser = sequelize.define(
        "advertiser",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            nature_of_business: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            zip_code: DataTypes.STRING,
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
            postal_zip_code: DataTypes.STRING,
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
                    notEmpty: true
                }
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: true
            }
        },
        {}
    );
    advertiser.associate = function(models) {
        advertiser.belongsTo(models.state, {
            foreignKey: "stateId"
        });
        advertiser.belongsTo(models.state, {
            foreignKey: "postalStateId"
        });
        advertiser.belongsTo(models.just_brilliant_guide, {
            foreignKey: { allowNull: false }
        });
        advertiser.hasMany(models.contact);
        advertiser.hasMany(models.advertising);
    };
    return advertiser;
};
