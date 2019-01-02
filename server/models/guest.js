"use strict";
module.exports = (sequelize, DataTypes) => {
    const guest = sequelize.define(
        "guest",
        {
            firstname: DataTypes.STRING,
            lastname: DataTypes.STRING,
            email: DataTypes.STRING
        },
        {}
    );
    guest.associate = function(models) {
        guest.belongsTo(models.client, {
            foreignKey: { allowNull: false }
        });
        guest.belongsToMany(models.room, {
            through: "guests_rooms"
        });
    };
    return guest;
};
