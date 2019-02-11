"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            "features", // name of Source table
            "featureCategoryId", // name of the key we're adding
            {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "feature_categories", // name of Target table
                    key: "id" // key in Target table that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        );
    },

    down: queryInterface => {
        return queryInterface.removeColumn(
            "features", // name of Source table
            "featureCategoryId" // key we want to remove
        );
    }
};
