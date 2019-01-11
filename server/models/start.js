"use strict";
module.exports = (sequelize, DataTypes) => {
    const start = sequelize.define(
        "start",
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
    start.associate = function(models) {
        start.belongsTo(models.layout, {
            foreignKey: { allowNull: false }
        });
        start.hasMany(models.system);
        start.belongsToMany(models.media, {
            through: "media_starts",
            as: "mediaStart"
        });
    };
    return start;
};
