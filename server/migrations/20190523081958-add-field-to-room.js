'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'rooms',
            'number',
            {
                type: Sequelize.INTEGER,
                after: 'name',
                allowNull: false
            }
        )
    },

    down: queryInterface => {
        return queryInterface.removeColumn(
            'rooms',
            'number'
        )
    }
};