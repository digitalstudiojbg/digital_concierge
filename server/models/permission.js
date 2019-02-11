"use strict";
module.exports = (sequelize, DataTypes) => {
    const permission = sequelize.define(
        "permission",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        },
        {}
    );
    permission.associate = function(models) {
        permission.belongsToMany(models.role, { through: "roles_permissions" });
        permission.belongsTo(models.permission_category, {
            foreignKey: { allowNull: false }
        });
    };
    return permission;
};
