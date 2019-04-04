"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            "layouts", // name of Source table
            "layoutTypeId", // name of the key we're adding
            {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "layout_types", // name of Target table
                    key: "id" // key in Target table that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        );
    },

    down: (queryInterface, _Sequelize) => {
        return queryInterface.removeColumn(
            "layouts", // name of Source table
            "layoutTypeId" // key we want to remove
        );
    }
};
