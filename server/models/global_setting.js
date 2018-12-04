"use strict";
module.exports = (sequelize, DataTypes) => {
    const global_setting = sequelize.define(
        "global_setting",
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
    global_setting.associate = function(models) {
        models.global_setting.belongsTo(models.venue, {
            foreignKey: { allowNull: false }
        });
    };
    return global_setting;
};
