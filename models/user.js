'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class User extends Model{};
  User.init({
    first_name: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: {
          args: true,
          msg: 'First name not valid'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: {
          args: true,
          msg: 'Last   name not valid'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email format is denied'
        },
        isUnique(value) {
          return User.findOne({ where: { email: value } })
            .then(user=> {
              if(user && user.id !== Number(this.id)) {
                throw new Error('Email already registered. Please login with your registered email and password');
              }
            })
            .catch(err=> {
              return err
            });
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 12],
          msg: 'Password minimal 6 characters and maximal 12 characters'
        }
      }
    },
    role: DataTypes.STRING
  }, { hooks: {

  }, sequelize });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Item, { through: models.UserItem })
  };
  return User;
};