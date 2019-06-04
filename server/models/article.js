"use strict";
module.exports = (sequelize, DataTypes) => {
    const article = sequelize.define(
        "article",
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
    article.associate = function(models) {
        article.belongsTo(models.just_brilliant_guide, {
            foreignKey: { allowNull: false }
        });
        article.belongsToMany(models.advertising, {
            through: "advertising_articles"
        });
    };
    return article;
};
