var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var config = require('../config');
var jwt = require('jsonwebtoken');
var User = require('../models/user'); // get our mongoose model
var Venue = require('../models/venue');
var Token = require('../models/token');
var mongoose = require('mongoose');
var venue_response = "";

var login_response = "";

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Bartinder' });

});

router.get('/clicker', function(req, res, next) {

  var test = req.headers.cookie;
  console.log("test: " + test.substring(11));
  var token = test.substring(11);
  Token.findOne({'token': token}, function(err, tokens){
    User.findOne({'_id': tokens['user_id']}, function(err, users) {
      Venue.findOne({'_id': users['venue_id']}, function(err, venues){
        var name = venues['name'];
        var venue_id = venues['_id'];
        res.render('clicker', {name: name, venue_id: venue_id})
      });
    });
  });
});

router.post('/tracked', function(req, res, next){
  var access_token = req.body.access_token;
  var patron_number = req.body.counter1;
  var comment = req.body.comment;
  var venue_id = req.body.venue_id;
  Venue.findOneAndUpdate({'_id': venue_id}, {patron_number: patron_number, comment: comment}, {new: true}, function(err, venue) {
    res.json(venue);
    if (err) {
      console.log('got an error');
    }
  });
  });

router.get('/setup', function(req, res) {

  // create a sample user
  var john = new User({
    name: 'Why',
    password: 'word',
    admin: true
  });

  // save the sample user
  john.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

router.get('/register', function(req, res, next) {
  var venue_id = [];
  var venue_name = [];
  Venue.find({}, function(err, venues) {
    for (var i = 0; i<venues.length; i++) {
    venue_name[i] = venues[i]['name'];
    venue_id[i] = venues[i]['_id'];
    }
  res.render('register', {title: 'Registration', venue_name: venue_name, venue_id: venue_id}); 
  });
});

router.post('/new_user', function(req,res,next){
	var name = req.body.name;
	var password = req.body.password;
	var admin = true;
  var venue_id = req.body.venues;
	var new_user = new User({
		name: name, 
		password: password, 
		admin: admin,
    venue_id: venue_id
	});

	new_user.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
   
  });
  res.redirect('/login');
});


router.get('/login', function(req, res, next) {
	res.render('login', {title: 'Login', login_response: login_response});
});

router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

router.post('/authenticate', function(req, res) {
	var name = req.body.name;
	var password = req.body.password;

  User.findOne({
    name: name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    }
    else if (user) {

      bcrypt.compare(password, user.password, function(err, result) {
        if (!result) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        }
        else {
          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, config.secret, {
            expiresInMinutes: 1440 // expires in 24 hours
          });

          // return the information including token as JSON
          var user_id = user['_id'];
          var new_token = new Token({
            token: token,
            user_id: user_id
          });
          new_token.save(function(err) {
            if (err) throw err;

            console.log('Token saved successfully');
   
          });
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }
      });

    }
  });

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
	var patron_number = req.body.patron_number;
	var comment = req.body.comment;
	Venue.find({}, function(err, venue){
		Venue.collection.insert({name: name, location: location, hours: hours, logo_url: logo_url, website_url: website_url, capacity: capacity, patron_number: patron_number, comment: comment});
		venue_response = "You successfully added a venue to the database!";
		res.redirect('/new');
	});
});





module.exports = router;