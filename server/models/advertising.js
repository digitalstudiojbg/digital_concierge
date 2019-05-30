"use strict";
module.exports = (sequelize, DataTypes) => {
    const advertising = sequelize.define(
        "advertising",
        {
            agreement_number: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            agreement_date: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            agreement_file: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            agreement_file_key: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            period_month: {
                type: DataTypes.INTEGER,
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
            artwork_supply_date: DataTypes.DATE,
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
    advertising.associate = function(models) {
        advertising.belongsTo(models.media, {
            foreignKey: { allowNull: false }
        });
        advertising.belongsTo(models.advertiser, {
            foreignKey: { allowNull: false }
        });
        advertising.belongsTo(models.artwork_size, {
            foreignKey: { allowNull: false }
        });
        advertising.hasMany(models.payment);
        advertising.belongsToMany(models.article, {
            through: "advertising_articles"
        });
    };
    return advertising;
};
