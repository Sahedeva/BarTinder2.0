// /models/user.js
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: String,
  venue_id: String,
  created_at: Date,
  updated_at: Date
});

var User = mongoose.model('User', userSchema);

// Make this available to our other files
module.exports = User;