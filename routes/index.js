var express = require('express');
var router = express.Router();
var User = require('../models/user'); // get our mongoose model
var Venue = require('../models/venue');
var mongoose = require('mongoose');
var venue_response = "";
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

router.get('/new', function(req, res, next) {
	res.render('new', {title: 'New Venue', venue_response: venue_response});
});


router.post('/new_venue', function(req,res,next){
	var name = req.body.name;
	var location = req.body.location;
	var hours = req.body.hours;
	var logo_url = req.body.logo_url;
	var website_url = req.body.website_url;
	var capacity = req.body.capacity;
	var patron_number = req.body.capacity;
	var comment = req.body.comment;
	Venue.find({}, function(err, venue){
		Venue.collection.insert({name: name, location: location, hours: hours, logo_url: logo_url, website_url: website_url, capacity: capacity, patron_number: patron_number, comment: comment});
		venue_response = "You successfully added a venue to the database!";
		res.redirect('/new');
	});
});

module.exports = router;
