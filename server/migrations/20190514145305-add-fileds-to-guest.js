'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'guests',
            'primary_number',
            {
                type: Sequelize.STRING,
                after: 'email',
                allowNull: false
            }
        )
        .then(() => queryInterface.addColumn(
            'guests',
            'secondary_number',
            {
                type: Sequelize.STRING,
                after: 'primary_number',
                allowNull: true
            }
        ));
    },

    down: queryInterface => {
        return queryInterface.removeColumn(
            'guests',
            'primary_number'
        )
        .then(() => queryInterface.removeColumn(
            'guests',
            'secondary_number'
        ));
    }
};