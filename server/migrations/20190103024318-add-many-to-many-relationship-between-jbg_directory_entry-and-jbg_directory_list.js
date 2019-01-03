"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(
            "jbg_directory_entries_jbg_directory_lists",
            {
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
                jbgDirectoryEntryId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    references: {
                        model: "jbg_directory_entries",
                        key: "id"
                    }
                },
                jbgDirectoryListId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    references: {
                        model: "jbg_directory_lists",
                        key: "id"
                    }
                }
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(
            "jbg_directory_entries_jbg_directory_lists"
        );
    }
};
