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
            lastname: DataTypes.STRING,
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
    guest.associate = function(models) {
        guest.belongsTo(models.venue, {
            foreignKey: { allowNull: false }
        });
        guest.belongsToMany(models.room, {
            through: "guests_rooms"
        });
    };
    return guest;
};
