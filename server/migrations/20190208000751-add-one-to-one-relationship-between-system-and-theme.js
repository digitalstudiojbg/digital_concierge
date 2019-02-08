"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            "themes", // name of Source table
            "systemId", // name of the key we're adding
            {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "systems", // name of Target table
                    key: "id" // key in Target table that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        );
    },
    down: (queryInterface, _Sequelize) => {
        return queryInterface.removeColumn(
            "themes", // name of Source table
            "systemId" // key we want to remove
        );
    }
};
