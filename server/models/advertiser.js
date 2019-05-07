'use strict';
module.exports = (sequelize, DataTypes) => {
  const advertiser = sequelize.define('advertiser', {
    name: DataTypes.STRING,
    nature_of_business: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    postal_address: DataTypes.STRING,
    postal_city: DataTypes.STRING,
    postal_zip_code: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {});
  advertiser.associate = function(models) {
    // associations can be defined here
  };
  return advertiser;
};