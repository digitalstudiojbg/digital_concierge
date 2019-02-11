"use strict";
module.exports = (sequelize, DataTypes) => {
    const payment = sequelize.define(
        "payment",
        {
            invoice_number: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            invoice_date: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            invoice_amount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            payable_date: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        },
        {}
    );
    payment.associate = function(models) {
        payment.belongsTo(models.client, {
            foreignKey: { allowNull: false }
        });
        payment.belongsTo(models.currency, {
            foreignKey: { allowNull: false }
        });
    };
    return payment;
};
