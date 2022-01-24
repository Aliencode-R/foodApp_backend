const express = require("express"); 
let personModel = require("../Models/personModel"); 

module.exports.getPerson = async function(req, res) {
    try { 
        let id = req.params.id;
        let person = await personModel.findById(id);
        if (person) {
            res.status(200).json(person);
        } else {
            res.json({
                message: "No user found"
            })
        }
    } catch (err) {
        res.status(500).json({ 
            message: err.message
        })
    }
}

module.exports.getAllPersons = async function(req, res) {
    try { 
        let persons = await personModel.find(); 
        if(persons) {
            res.json({
                data: persons
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.createPerson = async function (req, res) {
    try {
        console.log(req.body);
        let person = await personModel.create(req.body);
        res.json(person); 
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.deletePerson = async function (req, res) {
    try {
        let person = await personModel.findByIdAndDelete(req.params.id);
        res.json(person);
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.updatePerson = async function (req, res) {
    try {
        let person = await personModel.findById(req.params.id); 
        for(let key in req.body) {
            person[key] = req.body[key]; 
        }
        person.save({validateBeforeSave: false}); 
        res.json(person); 
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
