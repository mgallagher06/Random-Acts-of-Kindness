var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var db = require('../models');

passport.use(new LocalStrategy(
  {
    usernameField: 'username'
  },
  function(username, password, done){
    db.user.findOne({
      where: {
        username : username
      }
    }).then(function(dbuser){
      if(!dbuser){
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      else if(!dbuser.validPassword(password)){
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      return done(null, dbuser);
    });
  
  }
));

passport.serializeUser(function(user, cb){
  cb(null, user);
});

passport.deserializeUser(function(obj, cb){
  cb(null, obj);
});

module.exports = passport;
