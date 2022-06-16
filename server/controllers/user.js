let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let userModel = require('../models/user');
let User = userModel.User; // alias

module.exports.displayUserList = (req, res, next) => {
    if(req.user){
        User.find((err, userList) => {
            if(err)
            {
                return console.error(err);
            }
            else
            {
                // console.log(req.user);

                res.render('user/list', {
                    title: 'User', 
                    UserList: userList,
                    displayName: req.user ? req.user.displayName : ''
                });
            }
        });
    }else{
        res.redirect('/');
    }
}