"use strict";
module.exports = (sequelize, DataTypes) => {
    const room = sequelize.define(
        "room",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        },
        {}
    );
    room.associate = function(models) {
        room.belongsTo(models.client, {
            foreignKey: { allowNull: false }
        });
        room.belongsToMany(models.guest, {
            through: "guests_rooms"
        });
        room.hasOne(models.device);
    };
    return room;
};
