"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            "jbg_directory_entries", // name of Source table
            "layoutId", // name of the key we're adding
            {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "layouts", // name of Target table
                    key: "id" // key in Target table that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            "jbg_directory_entries", // name of Source table
            "layoutId" // key we want to remove
        );
    }
};
