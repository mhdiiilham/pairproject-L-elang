'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  const bcrypt = require('../helpers/bcrypt')
  class User extends Model{
    fullname() {
      return `${this.first_name} ${this.last_name}`
    }

    static sumUser(){
      return User.findAll({where: {isActive: ['TRUE', 'true']}})
        .then(data => {
          return data
        })
    }
  };
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
    role: DataTypes.STRING,
    salt: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, { hooks: {
    beforeCreate: function(user, options) {
      user.setDataValue('password', bcrypt.encrypt(user.password))
    }
  }, sequelize });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Item, { through: models.UserItem })
  };
  return User;
};