let express = require('express');
let router = express.Router();
let projectsData = require('../../public/assets/projects.json');
let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET About Us page. */
router.get('/about', indexController.displayAboutPage);

/* GET Products page. */
router.get('/projects', indexController.displayProjectPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact Us page. */
router.get('/contact', indexController.displayContactPage);

router.post('/contact', indexController.processContactPage);


// new
/* GET Route for displaying the Login page */
router.get('/login', indexController.displayLoginPage);

/* POST Route for processing the Login page */
router.post('/login', indexController.processLoginPage);

/* GET Route for displaying the Register page */
router.get('/register', indexController.displayRegisterPage);

/* POST Route for processing the Register page */
router.post('/register', indexController.processRegisterPage);

/* GET to perform UserLogout */
router.get('/logout', indexController.performLogout);

/* GET Project detail page. */
projectsData.forEach(function(link) {
    router.get('/projects' + link.path, function(req, res, next) {
      res.render('projectDetail', { 
        name: link.name,
        title: link.title,
        desc: link.description,
        year: link.year,
        images: link.images
      });
    });
});


module.exports = router;
