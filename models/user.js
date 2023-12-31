'use strict';
const bcrypt = require('bcrypt')
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
      User.hasMany(models.Admin)
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    PhoneNumber: DataTypes.STRING,
    role: DataTypes.STRING,
    Duration: DataTypes.INTEGER,
    userId: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate: (User) =>{
        User.password = bcrypt.hashSync(User.password, 11);
      },
      
    }
  });
  return User;
};