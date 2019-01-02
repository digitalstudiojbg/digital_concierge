"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            "users", // name of Source table
            "mediaId", // name of the key we're adding
            {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "media", // name of Target table
                    key: "id" // key in Target table that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            "users", // name of Source table
            "mediaId" // key we want to remove
        );
    }
};
