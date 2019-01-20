"use strict";
module.exports = (sequelize, DataTypes) => {
    const content = sequelize.define(
        "content",
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
    content.associate = function(models) {
        content.belongsToMany(models.content, {
            through: "contents_contents",
            as: "parent_content_association",
            foreignKey: "parent_content_Id"
        });
        content.belongsToMany(models.content, {
            through: "contents_contents",
            as: "child_content_association",
            foreignKey: "child_content_Id"
        });
    };
    return content;
};
