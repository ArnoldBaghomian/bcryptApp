 'use strict';

var mongoose = require('mongoose'); 
var bcrypt = require('bcrypt-node'); 

var User; 

var userSchema = new mongoose.Schema({
  username: { type: String, required: true }, 
  // hash: { type: String, required: true } 
  password: { type: String, required: true } 
});

userSchema.pre('save', function(next) {
  // hash the password 
  // this === object we're trying to save
  console.log('presave middleware:', this);

  if(!this.isNew) return next();  // ensures we only salt the hash for new users
  bcrypt.genSalt(12, (err, salt) => {
    bcrypt.hash(this.password, salt, null, (err, hash) => {
      // this.hash = hash; 
      this.password = hash; 
      next(); 
    }); 
  });
});

userSchema.statics.register = function(user, cb) {
  // user === {username: ___ , password: ____ }
  User.findOne({username: user.username}, function(err, dbUser) {
    if (err || dbUser) { return cb(err || 'Username already taken.')};

    User.create(user, function(err, savedUser) {
      // savedUser.hash = ''; 
      savedUser.password = ''; 
      cb(err, savedUser)
    }); 
  });
}; 

User = mongoose.model('User', userSchema); 

module.exports = User;