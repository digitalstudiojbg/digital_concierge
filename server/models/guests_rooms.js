"use strict";
module.exports = (sequelize, DataTypes) => {
    const guests_rooms = sequelize.define(
        "guests_rooms",
        {
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: true
            },
            pin: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            checkout_date: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        },
        {}
    );
    guests_rooms.associate = function(models) {
        guests_rooms.belongsTo(models.guest);
        guests_rooms.belongsTo(models.room);
    };
    return guests_rooms;
};
