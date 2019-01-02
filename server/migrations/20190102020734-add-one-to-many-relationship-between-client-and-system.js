"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            "systems", // name of Source table
            "clientId", // name of the key we're adding
            {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "clients", // name of Target table
                    key: "id" // key in Target table that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            "systems", // name of Source table
            "clientId" // key we want to remove
        );
    }
};
