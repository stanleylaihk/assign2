var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let indexController = require('../controllers/user');

// connect to our User Model
let User = require('../models/user');

let userController = require('../controllers/user');

/* GET Route for the User List page - READ Operation */
router.get('/', userController.displayUserList);

module.exports = router;
