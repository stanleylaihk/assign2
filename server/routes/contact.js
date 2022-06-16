let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Contact Model
let Contact = require('../models/contact');

let contactController = require('../controllers/contact');

/* GET Route for the Contact List page - READ Operation */
router.get('/', contactController.displayContactList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', contactController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', contactController.processAddPage);

/* GET Route for displaying the Update page - UPDATE Operation */
router.get('/update/:id', contactController.displayUpdatePage);

/* POST Route for processing the Update page - UPDATE Operation */
router.post('/update/:id', contactController.processUpdatePage);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', contactController.performDelete);

module.exports = router;