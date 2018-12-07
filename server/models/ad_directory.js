"use strict";
module.exports = (sequelize, DataTypes) => {
    const ad_directory = sequelize.define(
        "ad_directory",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: true
            }
        },
        {}
    );
    ad_directory.associate = function(models) {
        // associations can be defined here
    };
    return ad_directory;
};
