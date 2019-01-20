"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("contents_contents", {
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
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: false
            },
            parent_content_Id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "contents",
                    key: "id"
                }
            },
            child_content_Id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "contents",
                    key: "id"
                }
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("contents_contents");
    }
};
