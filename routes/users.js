var express = require('express');
var user = require('../models/user');
var router = express.Router();

router.get("/dev/createUser", function(req, res) {
  res.render('createUser');
});

router.post("/dev/createUser", function(req, res) {
  user.create(req.body.name, req.body.email, function(err) {
    res.render('createUser');
  });
});

module.exports = router;
