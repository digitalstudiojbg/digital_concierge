"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("tb_landing_pages_tb_media", {
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
            tbLandingPageId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "tb_landing_pages",
                    key: "id"
                }
            },
            tbMediumId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "tb_media",
                    key: "id"
                }
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("tb_landing_pages_tb_media");
    }
};
