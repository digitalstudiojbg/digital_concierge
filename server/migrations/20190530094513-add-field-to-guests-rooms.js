'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'guests_rooms',
            'is_sending_survey',
            {
                type: Sequelize.BOOLEAN,
                after: 'guest_count',
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: false
            }
        )
    },

    down: queryInterface => {
        return queryInterface.removeColumn(
            'guests_rooms',
            'is_sending_survey'
        )
    }
};