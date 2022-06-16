let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

// create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

// create a reference to the model
let Contact = require('../models/contact');

module.exports.displayContactList = (req, res, next) => {
    if(req.user){
        Contact.find((err, contactList) => {
            if(err) {
                return console.error(err);
            } else {
                // console.log(req.user);
    
                res.render('contact/list', {
                    title: 'Contacts', 
                    ContactList: contactList,
                    displayName: req.user ? req.user.displayName : ''
                });
            }
        }).sort({"name": 1});
    }else{
        res.redirect('/');
    }
}

module.exports.displayAddPage = (req, res, next) => {
    if(req.user){
        res.render('contact/add', {
            title: 'Add Contact',
            displayName: req.user ? req.user.displayName : ''
        })
    }else{
        res.redirect('/');
    }
}

module.exports.processAddPage = (req, res, next) => {
    if(req.user){
        let newContact = Contact({
            "name": req.body.inputName,
            "number": req.body.inputNumber,
            "email": req.body.inputEmail,
        });

        Contact.create(newContact, (err, Contact) =>{
            if(err) {
                console.log(err);
                res.end(err);
            } else {
                // refresh the contact list
                res.redirect('/contact-list');
            }
        });
    }else{
        res.redirect('/');
    }
}

module.exports.displayUpdatePage = (req, res, next) => {
    if(req.user){
        let id = req.params.id;

        Contact.findById(id, (err, contactToUpdate) => {
            if(err) {
                console.log(err);
                res.end(err);
            } else {
                //show the update view
                res.render('contact/update', {
                    title: 'Update Contact', 
                    contact: contactToUpdate,
                    displayName: req.user ? req.user.displayName : ''
                })
            }
        });
    }else{
        res.redirect('/');
    }
}

module.exports.processUpdatePage = (req, res, next) => {
    if(req.user){
        let id = req.params.id

        let updatedContact = Contact({
            "_id": id,
            "name": req.body.inputName,
            "number": req.body.inputNumber,
            "email": req.body.inputEmail
        });

        Contact.updateOne({_id: id}, updatedContact, (err) => {
            if(err) {
                console.log(err);
                res.end(err);
            } else {
                // refresh the contact list
                res.redirect('/contact-list');
            }
        });
    }else{
        res.redirect('/');
    }
}

module.exports.performDelete = (req, res, next) => {
    if(req.user){
        let id = req.params.id;

        Contact.remove({_id: id}, (err) => {
            if(err) {
                console.log(err);
                res.end(err);
            } else {
                // refresh the contact list
                res.redirect('/contact-list');
            }
        });
    }else{
        res.redirect('/');
    }
}
