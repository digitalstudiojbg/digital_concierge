"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            "just_brilliant_guides", // name of Source table
            "jbgWelcomeId", // name of the key we're adding
            {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "jbg_welcomes", // name of Target table
                    key: "id" // key in Target table that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            "just_brilliant_guides", // name of Source table
            "jbgWelcomeId" // key we want to remove
        );
    }
};
