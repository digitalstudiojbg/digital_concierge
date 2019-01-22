"use strict";
module.exports = (sequelize, DataTypes) => {
    const department = sequelize.define(
        "department",
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
    department.associate = function(models) {
        department.belongsToMany(models.client, {
            through: "clients_departments"
        });
        department.hasMany(models.role);
    };
    return department;
};
