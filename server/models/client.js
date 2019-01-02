"use strict";
module.exports = (sequelize, DataTypes) => {
    const client = sequelize.define(
        "client",
        {
            name: DataTypes.STRING,
            has_parent_category: DataTypes.BOOLEAN,
            active: DataTypes.BOOLEAN,
            has_tablet: DataTypes.BOOLEAN,
            has_touchscreen: DataTypes.BOOLEAN,
            number_of_users: DataTypes.INTEGER,
            avatar: DataTypes.STRING
        },
        {}
    );
    client.associate = function(models) {
        client.hasMany(models.user);
        client.hasMany(models.group);
        client.hasMany(models.room);
        client.hasMany(models.guest);
        client.hasMany(models.device);
        client.hasMany(models.system);
        // client.belongsTo(models.media, {
        //     foreignKey: { allowNull: false }
        // });
    };
    return client;
};
