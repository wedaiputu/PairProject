const { Model } = require('sequelize')
const { Car, User, Categoris, rent, sequelizem, Admin } = require('../models')
const { Op } = require("sequelize");
const priceHelper = require('../helper/priceHelper');
// const bcrypt = require('bcryptjs')




class Controller {
    static showCars(req, res) {
        Car.findAll()
            .then((result) => {
                res.render("showCars", { result })
            })
        // console.log('>>>><<<<<<');
        const { type } = req.query;
        let option = {};

        if (type) {
            option.where = {
                type: type,
            };
        }
    }

    static showDataForAdmin(req, res){
       User.findAll(req.body)
       .then((result)=>{
        res.render('adminPage', {result})
       })
    }

    static usersBook(req, res) {
        //case jika tidak butuh data
        res.render("usersBook")
    }
    static postUsersBook(req, res) {
        User.create(req.body)
            .then((result) => {
                console.log(result)
                res.redirect('/usersBook');
            })
            .catch((err) => {
                console.log(err);
                res.send(err);
            });
        // res.send(req.body)
    }


    static adminPage(req, res){
        // Admin.findAll()
        // .then((result)=>{
            res.render('loginFormAdmin', {})
        // })
        // .catch((err)=>{
        //     res.send(err)
        // })
    }

    static listUser(req, res){
        User.findAll()
        .then((result) => {
            // res.send(result)
            console.log(result);
            res.render('adminPage', {result})
        
            
        })

        .catch((err) => {
            res.send(err)
        })
    }

    static registerForm(req, res){
        res.render('registerForm')
    }
    static loginForm(req, res){
        res.render('loginFormAdmin')
    }
    static registerPost(req, res){
        const { name, email, password , role} = req.body;
        // console.log(req.body)
        // Profile.create
        Admin.create({
            username: name,
            email: email,
            password: password ,
            role: role
        })
        .then(result => {

            // sendRegistrationEmail(user.email);
            res.redirect('/adminPage', {result});
        })
        .catch(err => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.render('adminPage', { error: 'Username atau email sudah ada. Silakan pilih yang lain.' });
            }  else {
                res.render('adminPage', { error: 'Terjadi kesalahan saat pendaftaran.' });
                console.error(err);
            }
            
        });
      }

      static loginPost(req, res){
        const { name, password } = req.body;
        Admin.findOne({ where: { name } })
        .then(admin => {
            if (!admin) {
                throw new Error('User not found');
            }
            return admin.isValidPassword(password);
        })
        .then(isMatch => {
            if (!isMatch) {
                throw new Error('Password is incorrect');
            }
             req.session.isAuthenticated = true;
            res.redirect('/admins');
        })
        .catch(err => {
            res.render('registerForm', { error: err.message });
            // console.log(err)
        });
      }

      static userEditForm(req,res){
        const { errors } = req.query;
        const { userId, employeeId } = req.params;
        let option = {
            include: {
              model: ser,
              where: {id: +userId}
            }
        }

        option.where = {id: +employeeId}
        Car.findOne(option)
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


    static usersPostEdit(req,res){
        const { firstName,lastName,dateOfBirth,education,position,salary } = req.body
        const { storeData,Car } = req.params;

        Car.update(
            { firstName,lastName,dateOfBirth,education,position,salary },
            { where: {id: +Car}}
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
                    res.redirect(`/stores/${storeData}/employees/${Car}/edit?errors=${err.join(';')}`)
                }else{
                    //console.log(err);
                    res.send(err)
                }
            })
    }

    static userDelete(req,res){
        const { userId,employeeId } = req.params;
        let deletedEmployee;
        Car.findByPk(+employeeId)
          .then((result) => {
            deletedEmployee = `${result.firstName} ${result.lastName}` 
            return Car.destroy({ where: { id: +employeeId } });
          })
          .then((del) => {
            //res.send(del)
            res.redirect(`/stores/${userId}?alert=${deletedEmployee}`);
          })
          .catch((err) => {
            console.log(err);
            res.send(err);
          });
    }

    static usersDetail(req,res){
        const { userId } = req.params;  //dari nama routernya
        const { alert }  = req.query
    
        let option = {
            include: [{ 
                model : Admin,
                order: [["firstName","ASC"],["lastName","ASC"]],
                }],
            where: {id: +userId}
        }
        let userFind;
        User.findOne(option) 
        .then((result) => {
            userFind = result
            result.Employees.forEach(el =>{
                el.dataValues.priceHelper = priceHelper(el.dataValues.price)
                el.dataValues.car = el.car
            }) 
            return Car.findOne({where: {userId : +userId}, attributes : [[sequelize.fn("SUM", sequelize.col('price')), 'totalPrice']] })
        })
        .then((totalSalary) =>{
            //console.log(totalSalary);
            let priceHelper = priceHelper(+totalPrice.dataValues.totalPrice)
            res.render("adminPage", {userFind, employeeSalary, alert})
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
    }

}

module.exports = Controller