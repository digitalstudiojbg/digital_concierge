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
            is_standard_role: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: false
            }
        },
        {}
    );
    role.associate = function(models) {
        role.belongsToMany(models.permission, { through: "roles_permissions" });
        role.belongsToMany(models.user, { through: "roles_users" });
        role.belongsTo(models.department, {
            foreignKey: { allowNull: false }
        });
        role.belongsTo(models.client, {
            foreignKey: { allowNull: true }
        });
    };
    return role;
};
