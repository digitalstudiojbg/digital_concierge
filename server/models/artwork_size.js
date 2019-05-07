'use strict';
module.exports = (sequelize, DataTypes) => {
  const artwork_size = sequelize.define('artwork_size', {
    name: DataTypes.STRING
  }, {});
  artwork_size.associate = function(models) {
    // associations can be defined here
  };
  return artwork_size;
};