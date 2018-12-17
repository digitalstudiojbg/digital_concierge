"use strict";
module.exports = (sequelize, DataTypes) => {
    const system = sequelize.define(
        "system",
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
    system.associate = function(models) {
        system.belongsTo(models.venue, {
            foreignKey: { allowNull: false }
        });
    };
    return system;
};
