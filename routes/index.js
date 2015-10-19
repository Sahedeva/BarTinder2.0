var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bartinder' });

});

// Get another picture when an arrow is hit
router.get('/home', function(req, res) {
	
}

module.exports = router;
