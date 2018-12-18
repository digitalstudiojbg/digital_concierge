"use strict";
module.exports = (sequelize, DataTypes) => {
    const content_list_layout = sequelize.define(
        "content_list_layout",
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
    content_list_layout.associate = function(models) {
        content_list_layout.belongsToMany(models.validation, {
            through: "content_list_layouts_validations"
        });
    };
    return content_list_layout;
};
