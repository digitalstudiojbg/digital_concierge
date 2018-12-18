"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            "tiers", // name of Source table
            "contentLayoutId", // name of the key we're adding
            {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "content_layouts", // name of Target table
                    key: "id" // key in Target table that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            "tiers", // name of Source table
            "contentLayoutId" // key we want to remove
        );
    }
};
