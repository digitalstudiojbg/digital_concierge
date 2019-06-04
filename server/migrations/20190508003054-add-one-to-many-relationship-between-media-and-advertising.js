"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            "advertising", // name of Source table
            "mediumId", // name of the key we're adding
            {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "media", // name of Target table
                    key: "id" // key in Target table that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        );
    },

    down: (queryInterface, _Sequelize) => {
        return queryInterface.removeColumn(
            "advertising", // name of Source table
            "mediumId" // key we want to remove
        );
    }
};
