let express = require("express");
let personModel = require("personModel"); 
let jwt = require("jsonwebtoken"); 
const {JWT_KEY} = require("../secrets"); 
let bcrypt = require("bcrypt"); 

module.exports.signup = function (req, res) {
    try {
        let person = await personModel.create(req.body);
        // TODO: send mail on signup 
        res.json(person);  
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.login = function (req, res) {
    try {
        if(!req.body.email) {
            return res.json({
                message: "no email found"
            })
        }
        let person = await personModel.find({email: req.body.email}); 
        //TODO: ENABLE PASSWORD ENCRYPTION
        if(person.password != req.body.password) {
            return res.json({
                message: "wrong password"
            })
        }
        let token = jwt.sign({id: person._id}, JWT_KEY); 
        res.cookie("login", token, {httpOnly: true}); 
        res.json({
            message: "person logged in ", 
            person
        })
        

    } catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.forgetpassword = function (req, res) {
    try {

    } catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.resetpassword = function (req, res) {
    try {

    } catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.logout = function (req, res) {
    try {
        res.cookie("login", {maxAge: 1}); 
        res.json({
            message: "user logged out"
        })
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}