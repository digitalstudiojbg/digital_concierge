"use strict";
module.exports = (sequelize, DataTypes) => {
    const device = sequelize.define(
        "device",
        {
            number: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
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
