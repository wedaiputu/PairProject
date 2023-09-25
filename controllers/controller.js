const { Model } = require('sequelize')
const { Stores } = require('../models')
const { Op } = require("sequelize");




class Controller{ 
    static home(req, res){
        Stores.findAll()
        .then((result)=>{
            res.render("home",{result})
        })
        // console.log('>>>><<<<<<');
    }
    static addStore(req, res){
        //case jika tidak butuh data
        res.render("addStore")
    }
    static postAddStore(req, res) {
            Stores.create(req.body)
                .then((result) => {
                    res.redirect('/');
                })
                .catch((err) => {
                    console.log(err);
                    res.send(err);
                });
        // res.send(req.body)
        }

}

module.exports = Controller