var mongoose = require('mongoose');
var crypto = require('crypto');
var config = require('../config');

mongoose.connect(process.env.MONGO_DB);

var User = mongoose.model('User', {
  name: String,
  firstName: String,
  email: String,
  token: String,
  points: Number
});

var generateToken = function(key) {
  var salt = config.security.salt;
  var key = crypto.createHash('md5').update(key + salt).digest('hex');
  return key.substring(0,8);
};

var create = function(firstName, name, email) {
  var user = new User({ firstName: firstName, name: name, email: email });
  user.token = generateToken(email + name);
  user.points = 0;

  user.save();
  console.log(name + " (" + email + ") - /auth/" + user.token);
};

var parseCsvLineForUserInfo = function(line) {
  var userInfoMatcher = /^([^,]*),([^,]*),([^,]*)$/;
  var userInfo = line.match(userInfoMatcher);

  if (userInfo[0] === "") {
    console.log("Couldn't parse line: " + line);
  }
  var nameAndEmail = {
    email: userInfo[1],
    firstName: userInfo[2],
    name: userInfo[2] + " " + userInfo[3]
  };

  return nameAndEmail;
};

var getAndCreateUsersFromCsvFile = function(csvFile) {
  var reader = require("buffered-reader");
  var DataReader = reader.DataReader;
  new DataReader (csvFile, { encoding: "utf8" })
    .on ("error", function (error){
        console.log ("error: " + error);
    })
    .on ("line", function (line){
        var nameAndEmail = parseCsvLineForUserInfo(line);
        create(nameAndEmail.firstName, nameAndEmail.name, nameAndEmail.email);
    })
    .on ("end", function (){
        console.log ("EOF");
    })
    .read ();
};

getAndCreateUsersFromCsvFile("./tools/guestList.csv");
