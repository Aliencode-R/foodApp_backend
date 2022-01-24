let express = require("express");
let personModel = require("../Models/personModel");
let jwt = require("jsonwebtoken");
let { sendMail } = require("../utility/nodemailer");
const { JWT_KEY } = require("../secrets");
let bcrypt = require("bcrypt");

module.exports.signup = async function (req, res) {
    try {
        let person = await personModel.create(req.body);
        sendMail("signup", person);
        res.json(person);
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.login = async function (req, res) {
    try {
        if (!req.body.email) {
            return res.json({
                message: "no email found"
            })
        }
        let person = await personModel.find({ email: req.body.email });
        //TODO: ENABLE PASSWORD ENCRYPTION
        if (person.password != req.body.password) {
            return res.json({
                message: "wrong password"
            })
        }
        let token = jwt.sign({ id: person._id }, JWT_KEY);
        res.cookie("login", token, { httpOnly: true });
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

module.exports.forgetpassword = async function (req, res) {
    try {
        let { email } = req.body;
        const person = await personModel.findOne({ email });
        if (person) {
            let resetToken = person.createToken();
            await sendMail("resetpassword", person);
            res.json({
                message: "token sent to email",
                user,
                token
            })
        } else {
            res.json({
                message: "no user found"
            })
        }
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.resetpassword = async function (req, res) {
    try {
        let { token, password, confirmPassword } = req.body;
        let person = await personModel.findOne({ token });
        if (!person) {
            return res.json({
                message: "User not found"
            })
        }
        person.resetHandler(password, confirmPassword); 
        await person.save(); 
        res.json({
            message: "password changed succesfully"
        })

    } catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.logout = async function (req, res) {
    try {
        res.cookie("login", { maxAge: 1 });
        res.json({
            message: "user logged out"
        })
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}