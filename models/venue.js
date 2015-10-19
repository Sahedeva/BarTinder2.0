// /models/user.js
var mongoose = require('mongoose');

var venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  hours: String,
  patron_number: Number,
  logo_url: String,
  capacity: String,
  website_url: String,
  comment: String,
  created_at: Date,
  updated_at: Date
});

var Venue = mongoose.model('Venue', venueSchema);

// Make this available to our other files
module.exports = Venue;