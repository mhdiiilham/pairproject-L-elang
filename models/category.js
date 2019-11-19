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
              throw new Error ('Subject cannot empty');
            }
          },
          customValidator(value) {
            return Category.findOne({where: {name: value}})
              .then(category => {
                if(category && category.id !== this.id){
                  throw new Error("Subject is available");
                }
              })
          }
        }

      }, 
      code: DataTypes.INTEGER
    }, { sequelize }
  );
  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.Item)
  };
  return Category;
};