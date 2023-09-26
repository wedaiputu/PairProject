'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.belongsTo(models.Store)
      
    }
    get ageData(){
      const today = new Date();
      const tanggalLahir = new Date(this.dateOfBirth)
      const age = today.getFullYear() - tanggalLahir.getFullYear()
      console.log(tanggalLahir.getFullYear());
      return age;
    }
  }


  Employee.init({
    firstName: {
      type : DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          args: true, msg: "First Name Tidak Boleh Kosong"
        },
        notNull:{
          args: true, msg: "First Name Tidak Boleh Kosong"
        }
      }
    },

    lastName: {
      type : DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          args: true, msg: "Last Name Tidak Boleh Kosong"
        },
        notNull:{
          args: true, msg: "Last Name Tidak Boleh Kosong"
        }
      }
    },

    dateOfBirth: {
      type : DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          args: true, msg: "Date Of Birth Tidak Boleh Kosong"
        },
        notNull:{
          args: true, msg: "Date Of Birth Name Tidak Boleh Kosong"
        },
        ageValidate(){
          const birthDate = new Date(this.dateOfBirth)
          const currentDate = new Date()
          const ageInMilliSeconds = currentDate - birthDate
          const age = Math.floor(ageInMilliSeconds / (365.25 * 24 * 60 * 60 * 1000));
          if(age <= 17 ){
            throw new Error('Usia minimal 17 tahun');
          }
      }
      } 
    },
    
    education: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true, msg: "Education tidak boleh kosong"
        },
        notNull : {
          args: true, msg: "Education tidak boleh kosong"
        },
        checkPosition(){
          if((this.education === "S2" || this.education === "S3") && (this.position !== "Manager" && this.position !== "CEO")){
            throw new Error('Lulusan S2 atau S3 hanya bisa mengisi posisi Manager atau CEO');

          } else if((this.education === "S1" || this.education === "SMA") && (this.position !== "Staff" && this.position !== "Supervisor")) {
            throw new Error('Lulusan S1 atau SMA hanya bisa mengisi posisi Staff atau Supervisor');
          }
        }
      }
    },

    position: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Position tidak boleh kosong"
        },
        notNull : {
          args: true,
          msg: "Position tidak boleh kosong"
        },
      }
    },

    StoreId: DataTypes.INTEGER,
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true, msg: "Salary tidak boleh kosong"
        },
        notNull : {
          args: true, msg: "Salary tidak boleh kosong"
        },
        min: {
          args: 1, msg: "Salary tidak boleh nol"
        }
      }
    },
    
    salary: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};