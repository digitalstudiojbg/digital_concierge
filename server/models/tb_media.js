"use strict";
module.exports = (sequelize, DataTypes) => {
    const tb_media = sequelize.define(
        "tb_media",
        {
            path: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            type: {
                type: DataTypes.ENUM("image", "video"),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        },
        {}
    );
    tb_media.associate = function(models) {
        // associations can be defined here
    };
    return tb_media;
};
