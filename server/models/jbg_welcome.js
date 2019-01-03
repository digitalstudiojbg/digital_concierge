"use strict";
module.exports = (sequelize, DataTypes) => {
    const jbg_welcome = sequelize.define(
        "jbg_welcome",
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
    jbg_welcome.associate = function(models) {
        jbg_welcome.belongsTo(models.layout, {
            foreignKey: { allowNull: false }
        });
        jbg_welcome.belongsToMany(models.media, {
            through: "jbg_welcomes_media"
        });
        jbg_welcome.hasMany(models.just_brilliant_guide);
    };
    return jbg_welcome;
};
