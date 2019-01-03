"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("directory_entries_directory_lists", {
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
                defaultValue: true
            },
            directoryEntryId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "directory_entries",
                    key: "id"
                }
            },
            directoryListId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "directory_lists",
                    key: "id"
                }
            }
        });
    },

    down: (queryInterface, _Sequelize) => {
        return queryInterface.dropTable("directory_entries_directory_lists");
    }
};
