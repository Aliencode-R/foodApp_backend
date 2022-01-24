const express = require("express");
const personRouter = express.Router();
const personModel = require("../Models/personModel");
let {getPerson, getAllPersons, createPerson, deletePerson, updatePerson} = require("../controller/personController"); 

personRouter.route("/:id")
    .get(getPerson)
    .delete(deletePerson)
    .patch(updatePerson)

personRouter.route("/")
    .get(getAllPersons)
    .post(createPerson); // temp; 

// personRouter.route("/signup")
//     .post(signup);

// personRouter.route("/login")
//     .post(login);

// personRouter.route("/signup")
//     .post(signup);

// personRouter.route('/forgetpassword')
//     .post(forgetpassword)

// personRouter.route('/resetpassword/:token')
//     .post(resetpassword)

// personRouter.route('/logout')
//     .get(logout)

module.exports = personRouter; 