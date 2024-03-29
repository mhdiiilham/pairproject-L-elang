'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  const models = sequelize.models
  class Item extends Model{};
  Item.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        isNull(value){
          if(!value){
            throw new Error ('Name cannot empty');
          }
        }
      }
    } ,
    CategoryId: {
      type: DataTypes.INTEGER,
      validate: {
        isNull(value){
          if(!value){
            throw new Error ('Category cannot empty');
          }
        }
      }
    }, 
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isNull(value){
          if(!value){
            throw new Error ('Price cannot empty');
          }
        }
      }
    },
    code: {
      type: DataTypes.STRING,
    }, 
    image: {
      type: DataTypes.BLOB,
      validate: {
        isNull(value){
          if(!value){
            throw new Error ('Image cannot empty');
          }
        }
      }
    },
    status: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (item) => {
        item.code = `LEL-${item.name.toUpperCase().slice(0,3)}-${new Date().getFullYear()}:${new Date().getSeconds()}`
      }
    },
    sequelize
  });
  
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsTo(models.Category)
    Item.belongsToMany(models.User, { through: models.UserItem })
    Item.hasMany(models.UserItem)
  };
  return Item;
};