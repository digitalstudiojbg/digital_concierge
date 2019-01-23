"use strict";
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        "user",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: true
            }
            // avatar: {
            //     type: DataTypes.STRING
            // }
        },
        {}
    );
    user.associate = function(models) {
        user.belongsToMany(models.role, {
            through: "roles_users"
        });
        user.belongsTo(models.client, {
            foreignKey: { allowNull: false }
        });
        user.hasMany(models.activity_log);
    };
    return user;
};
