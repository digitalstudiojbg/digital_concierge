"use strict";
module.exports = (sequelize, DataTypes) => {
    const tb_directories_tb_categories = sequelize.define(
        "tb_directories_tb_categories",
        {
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
    tb_directories_tb_categories.associate = function(models) {
        tb_directories_tb_categories.belongsTo(models.tb_directory);

        tb_directories_tb_categories.belongsTo(models.tb_category);
    };
    return tb_directories_tb_categories;
};
