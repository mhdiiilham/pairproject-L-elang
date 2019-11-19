'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class UserItem extends Model{};
  UserItem.init({
    UserId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    bid: DataTypes.INTEGER
  }, { sequelize });
  UserItem.associate = function(models) {
    // associations can be defined here
  };
  return UserItem;
};