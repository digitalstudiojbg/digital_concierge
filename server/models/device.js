"use strict";
module.exports = (sequelize, DataTypes) => {
    const device = sequelize.define(
        "device",
        {
            number: DataTypes.STRING
        },
        {}
    );
    device.associate = function(models) {
        device.belongsTo(models.room, {
            foreignKey: { allowNull: false }
        });
        device.belongsTo(models.client, {
            foreignKey: { allowNull: false }
        });
        device.belongsTo(models.system, {
            foreignKey: { allowNull: false }
        });
    };
    return device;
};
