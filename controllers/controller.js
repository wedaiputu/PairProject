const { Model } = require('sequelize')
const { Store, Employee, sequelize } = require('../models')
const { Op } = require("sequelize");
const convertSalary = require('../helper/convertSalary');




class Controller {
    static home(req, res) {
        Store.findAll()
            .then((result) => {
                res.render("home", { result })
            })
        // console.log('>>>><<<<<<');
        const { position } = req.query;
        let option = {};

        if (position) {
            option.where = {
                position: position,
            };
        }
    }
    static addStore(req, res) {
        //case jika tidak butuh data
        res.render("addStore")
    }
    static postAddStore(req, res) {
        Store.create(req.body)
            .then((result) => {
                res.redirect('/');
            })
            .catch((err) => {
                console.log(err);
                res.send(err);
            });
        // res.send(req.body)
    }

    static employee(req, res) {
        //case jika tidak butuh data
        const { position } = req.query
        let option = {
            include: [Store]
        }


        
        if (position) {
            option.where = {
                position:{
                    [Op.iLike]: `%${position}%`
                }
            }
        }
        
        

        Employee.findAll(option)
            .then((result) => {
                // console.log(result, ">>>>");
                // res.send(result[0])

                res.render('employees', { result })
            })
            


            .catch((err) => {
                // console.log(err);
                res.send(err);
            });

    }

    static employeesPosition(req, res) {
        const { id } = req.params
        Store.findByPk(+id)
            .then((result) => {
                res.render("employees", { result })
            })
            .catch((err) => {
                console.log(err);
                res.send(err)
            })
    }



    static storeDetail(req, res){
        const {storeId} = req.params

        // console.log(storeId);

        const { position } = req.query
        let option = {
            include: [Employee]
            
        }

        Store.findByPk(+storeId, option)

            // res.send(result)
        .then((result) => {

            res.render("storeDetail",{result})
        })

        .catch((err)=>{
            console.log(err);
            res.send(err)
        })
    }

    static storeDetail(req,res){
        const { storeId } = req.params;  //dari nama routernya
        const { alert }  = req.query
        let option = {
            include: [{ 
                model : Employee,
                order: [["firstName","ASC"],["lastName","ASC"]],
                }],
            where: {id: +storeId}
        }
        let storeFind;
        Store.findOne(option) 
        .then((result) => {
            storeFind = result
            result.Employees.forEach(el =>{
                el.dataValues.formatSalary = convertSalary(el.dataValues.salary)
                el.dataValues.age = el.Age
            }) 
            return Employee.findOne({where: {StoreId : +storeId}, attributes : [[sequelize.fn("SUM", sequelize.col('salary')), 'totalSalary']] })
        })
        .then((totalSalary) =>{
            //console.log(totalSalary);
            let employeeSalary = convertSalary(+totalSalary.dataValues.totalSalary)
            res.render("storeDetail", {storeFind, employeeSalary, alert})
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
    }
        //case jika tidak butuh data
        // res.send('test<<<<<<<')
        //storee inckude emloyee, store gunakan findOne, id req.params, render, kirim ke ejs.

    static employeeAdd(req,res){
        const { errors } = req.query;
        const { storeId } = req.params; 
        let option = {
            where: {id: +storeId}
        }
        Store.findOne(option)
        .then((result) => {
            res.render("addEmployee",{result,errors})
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
    }

    static employeePostAdd(req,res){
        const { storeId } = req.params; 
        const { firstName,lastName,dateOfBirth,education,position,salary } = req.body
        Employee.create({ 
            firstName,
            lastName,
            dateOfBirth,
            education,
            position,
            StoreId : storeId,salary 
        })
        .then((result) => {
            res.redirect(`/stores/${storeId}`)
        })
        .catch((err) => {
            if (err.name === "SequelizeValidationError") {
                err = err.errors.map((el) => {
                    return el.message
                })
                res.redirect(`/stores/${storeId}/employees/add?errors=${err.join(';')}`)
            }else{
                //console.log(err);
                res.send(err)
            }
        })
    }

    static employeeEditForm(req,res){
        const { errors } = req.query;
        const { storeId, employeeId } = req.params;
        let option = {
            include: {
              model: Store,
              where: {id: +storeId}
            }
        }

        option.where = {id: +employeeId}
        Employee.findOne(option)
            .then((result) => {
                const date = new Date(result.dateOfBirth); 
                const year = date.getFullYear();
                const month = date.getMonth() < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1
                const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
                const templateDate = `${year}-${month}-${day}`
                res.render("employeeEditForm",{result, templateDate, errors})
                //res.send(result,"<<<<<<<<<<")
            })
            .catch((err) => {
                console.log(err);
                res.send(err)
            })
    }


    static employeePostEdit(req,res){
        const { firstName,lastName,dateOfBirth,education,position,salary } = req.body
        const { storeData,employee } = req.params;

        Employee.update(
            { firstName,lastName,dateOfBirth,education,position,salary },
            { where: {id: +employee}}
        )
            .then(() => {
                //res.send('TESTSssssssss')
                res.redirect(`/Store/${storeData}`);
            })
            //
            .catch((err) => {
                if (err.name === "SequelizeValidationError") {
                    err = err.errors.map((el) => {
                        return el.message
                    })
                    res.redirect(`/stores/${storeData}/employees/${employee}/edit?errors=${err.join(';')}`)
                }else{
                    //console.log(err);
                    res.send(err)
                }
            })
    }

    static employeeDelete(req,res){
        const { storeData,employeeId } = req.params;
        let deletedEmployeeFullName;
        Employee.findByPk(+employeeId)
          .then((result) => {
            deletedEmployeeFullName = `${result.firstName} ${result.lastName}` 
            return Employee.destroy({ where: { id: +employeeId } });
          })
          .then((del) => {
            //res.send(del)
            res.redirect(`/stores/${storeData}?alert=${deletedEmployeeFullName}`);
          })
          .catch((err) => {
            console.log(err);
            res.send(err);
          });
    }


}

module.exports = Controller