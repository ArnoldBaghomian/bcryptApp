'use strict';

var bcrypt = require('bcrypt-node');

var password = 'this is my password';

// gives hashing to the password
bcrypt.genSalt(12, function(err,salt){
  bcrypt.hash(password, salt,null, function(err, hash){

    console.log('err:', err);
    console.log('hash:', hash);

    // compares the password entered from user and hash that is stored in mongodb
    bcrypt.compare(password, hash, function(err, result){
        console.log('err:', err);
        console.log('result:', result);
    });

  });
});