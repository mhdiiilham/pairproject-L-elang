'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Category extends Model {};
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          isNull(value){
            if(!value){
              throw new Error ('Category cannot empty');
            }
          },
          customValidator(value) {
            return Category.findOne({where: {name: value}})
              .then(category => {
                if(category && category.id !== this.id){
                  throw new Error("Category is available");
                }
              })
          }
        }

      }, 
      code: {
        type: DataTypes.STRING,
        validate: {
          isNull(value){
            if(!value){
              throw new Error ('Code cannot empty');
            }
          }
        }
      }, 
    }, {
      hooks: {
        beforeCreate: (category) => {
          let Upper = category.name.toUpperCase()
          category.code = `LEL-2019-${Upper.slice(0,3)}`
        }
      },
      sequelize
    });


  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.Item)
  };
  return Category;
};