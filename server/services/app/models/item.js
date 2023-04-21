'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.hasMany(models.Ingredient, {foreignKey : 'itemId', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
      // Item.belongsTo(models.User, { foreignKey : 'authorId', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
      Item.belongsTo(models.Category, { foreignKey : 'categoryId', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    }
  }
  Item.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Name is required"
        },
        notEmpty : {
          msg : "Name is required"
        }
      }
    },
    description: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Description is required"
        },
        notEmpty : {
          msg : "Description is required"
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Price is required"
        },
        notEmpty : {
          msg : "Price is required"
        },
        min : {
          args : 10000,
          msg : "Minimum price 10000"
        }
      }
    },
    imgUrl: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Image Url is required"
        },
        notEmpty : {
          msg : "Image Url is required"
        }
      }
    },
    authorId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    UserMongoId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Item',
  });
  
  return Item;
};