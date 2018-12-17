"use strict";
module.exports = (sequelize, DataTypes) => {
    const content_layout = sequelize.define(
        "content_layout",
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
    content_layout.associate = function(models) {
        // associations can be defined here
    };
    return content_layout;
};
