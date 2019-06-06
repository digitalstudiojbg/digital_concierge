"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            "articles", // name of Source table
            "jbgLayoutId", // name of the key we're adding
            {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "jbg_layouts", // name of Target table
                    key: "id" // key in Target table that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        );
    },

    down: (queryInterface, _Sequelize) => {
        return queryInterface.removeColumn(
            "articles", // name of Source table
            "jbgLayoutId" // key we want to remove
        );
    }
};
