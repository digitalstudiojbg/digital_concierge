"use strict";
module.exports = (sequelize, DataTypes) => {
    const room = sequelize.define(
        "room",
        {
            name: DataTypes.STRING
        },
        {}
    );
    room.associate = function(models) {
        room.belongsTo(models.venue, {
            foreignKey: { allowNull: false }
        });
        room.belongsToMany(models.guest, {
            through: "guests_rooms"
        });
    };

    return room;
};
