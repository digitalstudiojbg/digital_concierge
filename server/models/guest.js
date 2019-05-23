"use strict";
module.exports = (sequelize, DataTypes) => {
    const guest = sequelize.define(
        "guest",
        {
            firstname: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            lastname: {
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
            primary_number: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            secondary_number: {
                type: DataTypes.STRING,
                allowNull: true
            },
        },
        {}
    );
    guest.associate = function(models) {
        guest.belongsTo(models.client, {
            foreignKey: { allowNull: false }
        });
        guest.belongsToMany(models.room, {
            through: models.guests_rooms
        });
    };
    return guest;
};
