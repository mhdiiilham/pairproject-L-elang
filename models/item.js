'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Item extends Model{};
  Item.init({
    name: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    code: DataTypes.STRING,
    image: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (item) => {
        item.code = `${item.name.toUpperCase()}`
      }
    },
    sequelize
  });
  
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsTo(models.Category)
    Item.belongsToMany(models.User, { through: models.UserItem })
  };
  return Item;
};