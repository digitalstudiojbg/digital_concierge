"use strict";
module.exports = (sequelize, DataTypes) => {
    const license = sequelize.define(
        "license",
        {
            key: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            commence_date: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            expire_date: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            auto_renewal: {
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
                },
                defaultValue: true
            }
        },
        {}
    );
    license.associate = function(models) {
        license.belongsTo(models.client, {
            foreignKey: { allowNull: false }
        });
        license.belongsTo(models.license_type, {
            foreignKey: { allowNull: false }
        });
    };
    return license;
};
