"use strict";
module.exports = (sequelize, DataTypes) => {
    const landing_page_layout = sequelize.define(
        "landing_page_layout",
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
    landing_page_layout.associate = function(models) {
        landing_page_layout.belongsToMany(models.validation, {
            through: "landing_page_layouts_validations"
        });
    };
    return landing_page_layout;
};
