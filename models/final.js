'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Final extends Model {};
  Final.init({
    UserId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, { sequelize });
  Final.associate = function(models) {
    // associations can be defined here
  };
  return Final;
};