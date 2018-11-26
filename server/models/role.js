"use strict";
module.exports = (sequelize, DataTypes) => {
    const role = sequelize.define(
        "role",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            is_admin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: true
            }
        },
        {}
    );
    role.associate = function(models) {
        role.belongsToMany(models.permission, { through: "roles_permissions" });
        role.hasMany(models.user);
        role.belongsToMany(models.venue, { through: "roles_venues" });
    };
    return role;
};
