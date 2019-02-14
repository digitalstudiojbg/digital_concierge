"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            "departments", // name of Source table
            "is_standard_department", // name of the key we're adding
            {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: false
            }
        );
    },

    down: queryInterface => {
        return queryInterface.removeColumn(
            "departments", // name of Source table
            "is_standard_department" // key we want to remove
        );
    }
};
