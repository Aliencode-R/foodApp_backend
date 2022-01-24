const express = require("express");
const personRouter = express.Router();
const personModel = require("../Models/personModel");
let {getPerson, getAllPersons, createPerson, deletePerson, updatePerson} = require("../controller/personController"); 
let {signup, login, forgetpassword, resetpassword, logout} = require("../controller/authController"); 

personRouter.route("/:id")
    .get(getPerson)
    .delete(deletePerson)
    .patch(updatePerson)

personRouter.route("/")
    .get(getAllPersons)
    .post(createPerson); 

personRouter.route("/signup")
    .post(signup);

personRouter.route("/login")
    .post(login);

personRouter.route('/forgetpassword')
    .post(forgetpassword)

personRouter.route('/resetpassword')
    .post(resetpassword)

personRouter.route('/logout')
    .get(logout)

module.exports = personRouter; 