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
            },
            order: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            description: DataTypes.TEXT,
            introductionText: DataTypes.TEXT,
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
    article.associate = function(models) {
        article.belongsTo(models.just_brilliant_guide, {
            foreignKey: { allowNull: false }
        });
        article.belongsToMany(models.advertising, {
            through: "advertising_articles"
        });
        article.belongsTo(models.jbg_template, {
            foreignKey: { allowNull: false }
        });
        article.belongsTo(models.jbg_layout, {
            foreignKey: { allowNull: false }
        });
        article.belongsTo(models.media, {
            foreignKey: "headerMediumId"
        });
        article.belongsTo(models.media, {
            foreignKey: "featureMediumId"
        });
    };
    return article;
};
