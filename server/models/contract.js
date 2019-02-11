"use strict";
module.exports = (sequelize, DataTypes) => {
    const contract = sequelize.define(
        "contract",
        {
            number: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            file: {
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
            renewal_date: {
                type: DataTypes.DATE,
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
    contract.associate = function(models) {
        contract.belongsTo(models.client, {
            foreignKey: { allowNull: false }
        });
    };
    return contract;
};
