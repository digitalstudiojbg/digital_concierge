"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("advertising_articles", {
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("NOW()")
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("NOW()")
            },
            advertisingId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "advertising",
                    key: "id"
                }
            },
            articleId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "articles",
                    key: "id"
                }
            }
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable("advertising_articles");
    }
};
