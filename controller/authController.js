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
        let person = await personModel.findOne({ email: req.body.email });
        let passwordMatch = await bcrypt.compare(req.body.password, person.password);
        if (!passwordMatch) {
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
            let tk = person.createToken();
            person.save({ validateBeforeSave: false });
            let resetLink = `${req.protocol}://${req.get("host")}/resetpassword/${person.token}`
            
            let personObj = person; 
            personObj["resetLink"] = resetLink;
            await sendMail("resetpassword", personObj); ;
            res.json({
                message: "token sent to email",
                person
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
        let token = req.params.token;
        let {password, confirmPassword } = req.body;
        console.log(token, password, confirmPassword);
        let person = await personModel.findOne({ token });
        if (!person) {
            return res.json({
                message: "Person not found" 
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
        res.cookie("login", "", { maxAge: 100, httpOnly: true });
        res.json({
            message: "user logged out"
        })
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}