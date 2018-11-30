"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("tb_directory_types_validations", {
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
            tbDirectoryTypeId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "tb_directory_types",
                    key: "id"
                }
            },
            validationId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "validations",
                    key: "id"
                }
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("tb_directory_types_validations");
    }
};
