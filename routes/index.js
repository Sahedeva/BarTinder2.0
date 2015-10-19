var express = require('express');
var router = express.Router();
var Venue = require('../models/venue');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bartinder' });

});

// Get another picture when an arrow is hit
router.get('/home', function(req, res) {
	Venue.find({}, function(err, venues) {
// Get back a random variable from the database so you can display on page
	venue = venues[Math.floor(Math.random()*venues.length)]
	console.log(venue)
	res.render('home')
	});
});

module.exports = router;
