"use strict";
module.exports = (sequelize, DataTypes) => {
    const ad_directory_type = sequelize.define(
        "ad_directory_type",
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
    ad_directory_type.associate = function(models) {
        // associations can be defined here
    };
    return ad_directory_type;
};
