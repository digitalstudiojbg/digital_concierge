"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("guests_rooms", {
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("NOW()")
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("NOW()")
            },
            guestId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "guests",
                    key: "id"
                }
            },
            roomId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "rooms",
                    key: "id"
                }
            },
            pin: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: true
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("guests_rooms");
    }
};
