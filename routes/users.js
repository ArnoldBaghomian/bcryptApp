var express = require('express');
var router = express.Router();


var User = require('../models/user');

/* GET users listing. */
router.post('/register', function(req, res, next) {

  // req.body ==={ username:_____, password: ______}

  User.register(req.body, function(err, user){

    res.status(err ? 400 : 200).send(err || user);

  });
});

module.exports = router;
