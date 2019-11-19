'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Item extends Model{};
  Item.init({
    name: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    code: DataTypes.STRING
  }, { sequelize });
  Item.associate = function(models) {
    // associations can be defined here
  };
  return Item;
};