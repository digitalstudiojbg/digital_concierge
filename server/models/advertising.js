'use strict';
module.exports = (sequelize, DataTypes) => {
  const advertising = sequelize.define('advertising', {
    agreement_number: DataTypes.STRING,
    agreement_date: DataTypes.DATE,
    agreement_file: DataTypes.STRING,
    agreement_file_key: DataTypes.STRING,
    period_month: DataTypes.INTEGER,
    commence_date: DataTypes.DATE,
    expire_date: DataTypes.DATE,
    artwork_supply_date: DataTypes.DATE,
    active: DataTypes.BOOLEAN
  }, {});
  advertising.associate = function(models) {
    // associations can be defined here
  };
  return advertising;
};