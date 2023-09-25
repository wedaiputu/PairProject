'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  Stores.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    location: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance)=>{
        let date = new Date()
        let time = date.getTime()
        
        if (instance.category === "Midi") {
          instance.code = `002-${time}`
        } else if (instance.category === "Mart") {
          instance.code = `001-${time}`
        } else {
            instance.code = `003-${time}`
        }
      }

    },
    sequelize,
    modelName: 'Stores',
  });
  return Stores;
};