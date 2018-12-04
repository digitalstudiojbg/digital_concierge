"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("tb_landing_pages", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            header_logo: {
                type: Sequelize.STRING
            },
            header_text: {
                type: Sequelize.STRING
            },
            body_image: {
                type: Sequelize.STRING
            },
            button: {
                type: Sequelize.STRING
            },
            bg_color: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("NOW()")
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("NOW()")
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("tb_landing_pages");
    }
};
