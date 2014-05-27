var mongoose = require('mongoose');
var crypto = require('crypto');
var config = require('../config');

var User = mongoose.model('User', {name: String, email: String, token: String, points: Number});

var generateToken = function(key) {
  var salt = config.security.salt;
  return crypto.createHash('md5').update(key + salt).digest('hex');
};

var create = function(name, email, callback) {
  user = new User({ name: name, email: email });
  user.token = generateToken(email);
  user.points = 0;

  user.save(callback);
};


module.exports = {
  create: create
};
