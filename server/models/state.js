"use strict";
module.exports = (sequelize, DataTypes) => {
    const state = sequelize.define(
        "state",
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
    state.associate = function(models) {
        state.belongsTo(models.country, {
            foreignKey: { allowNull: false }
        });
        state.hasMany(models.client, {
            foreignKey: "venueStateId"
        });
        state.hasMany(models.client, {
            foreignKey: "postalStateId"
        });
        state.hasMany(models.advertiser, {
            foreignKey: "stateId"
        });
        state.hasMany(models.advertiser, {
            foreignKey: "postalStateId"
        });
    };
    return state;
};
