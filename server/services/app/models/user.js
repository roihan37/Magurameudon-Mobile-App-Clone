'use strict';
const { hash } = require('../helper/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(models.Item, { foreignKey : 'authorId'})
    }
  }
  User.init({
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : {
        msg : "Username must be unique"
      },
      validate : {
        notNull : {
          msg : "Username is required"
        },
        notEmpty : {
          msg : "Username is required"
        },
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : {
        msg : "Email must be unique"
      },
      validate : {
        notNull : {
          msg : "Email is required"
        },
        notEmpty : {
          msg : "Email is required"
        },
        isEmail : {
          msg : 'Must be e-mail format'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        len : {
          args : 5,
          msg : "Password must be 5 characters",
        },
        notNull : {
          msg : "Password is required"
        },
        notEmpty : {
          msg : "Password is required"
        },
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user, options) => {
    const hashedPassword = hash(user.password);
    user.password = hashedPassword;
  });

  return User;
};