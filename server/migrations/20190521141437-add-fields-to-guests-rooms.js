'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'guests_rooms',
            'checkin_date',
            {
                type: Sequelize.DATE,
                after: 'checkout_date',
                allowNull: false
            }
        )
        .then(() => queryInterface.addColumn(
            'guests_rooms',
            'total_nights',
            {
                type: Sequelize.INTEGER,
                after: 'checkin_date',
                allowNull: false
            }
        ))
        .then(() => queryInterface.addColumn(
            'guests_rooms',
            'total_people',
            {
                type: Sequelize.INTEGER,
                after: 'total_nights',
                allowNull: false
            }
        ));
    },

    down: queryInterface => {
        return queryInterface.removeColumn(
            'guests_rooms',
            'checkin_date'
        )
        .then(() => queryInterface.removeColumn(
            'guests_rooms',
            'total_nights'
        ))
        .then(() => queryInterface.removeColumn(
            'guests_rooms',
            'total_people'
        ));
    }
};