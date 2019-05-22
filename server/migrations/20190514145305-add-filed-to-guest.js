'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'guests',
            'phone1',
            {
                type: Sequelize.STRING,
                after: 'email',
                allowNull: false
            }
        )
        .then(() => queryInterface.addColumn(
            'guests',
            'phone2',
            {
                type: Sequelize.STRING,
                after: 'phone1',
                allowNull: true
            }
        ));
    },

    down: queryInterface => {
        return queryInterface.removeColumn(
            'guests',
            'phone1'
        )
        .then(() => queryInterface.removeColumn(
            'guests',
            'phone2'
        ));
    }
};