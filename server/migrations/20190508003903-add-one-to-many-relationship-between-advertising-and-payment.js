"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            "payments", // name of Source table
            "advertisingId", // name of the key we're adding
            {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "advertising", // name of Target table
                    key: "id" // key in Target table that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        );
    },

    down: (queryInterface, _Sequelize) => {
        return queryInterface.removeColumn(
            "payments", // name of Source table
            "advertisingId" // key we want to remove
        );
    }
};
