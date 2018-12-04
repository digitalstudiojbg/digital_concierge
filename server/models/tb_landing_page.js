"use strict";
module.exports = (sequelize, DataTypes) => {
    const tb_landing_page = sequelize.define(
        "tb_landing_page",
        {
            header_logo: DataTypes.STRING,
            header_text: DataTypes.STRING,
            body_image: DataTypes.STRING,
            button: DataTypes.STRING,
            bg_color: DataTypes.STRING
        },
        {}
    );
    tb_landing_page.associate = function(models) {
        tb_landing_page.belongsTo(models.tb_directory_type, {
            foreignKey: { allowNull: false }
        });
        tb_landing_page.belongsTo(models.venue, {
            foreignKey: { allowNull: false }
        });
    };
    return tb_landing_page;
};
