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
    };
    return state;
};
