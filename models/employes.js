'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employes.init({
    firstName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    education: DataTypes.STRING,
    position: DataTypes.STRING,
    StoreId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employes',
  });
  return Employes;
};