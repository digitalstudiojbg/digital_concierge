"use strict";
module.exports = (sequelize, DataTypes) => {
    const contact = sequelize.define(
        "contact",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            title: {
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
            mobile: {
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
            }
        },
        {}
    );
    contact.associate = function(models) {
        contact.belongsTo(models.client, {
            foreignKey: { allowNull: false }
        });
    };
    return contact;
};
