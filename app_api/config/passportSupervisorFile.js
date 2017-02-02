var passport = require('passport');
var mongoose=require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var SupervisorValidation=mongoose.model('SupervisorValidation');

passport.use(new LocalStrategy({
usernameField: 'email'
},
  function(username, password, done) {
    SupervisorValidation.findOne({ email: username }, 
    	function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));