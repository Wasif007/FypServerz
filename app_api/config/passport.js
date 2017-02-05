var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var guardValidation=mongoose.model('guardAdd');
var SupervisorValidation=mongoose.model('SupervisorValidation');

passports.use('guard-local',new LocalStrategy({
usernameField: 'email'
},
function(username, password, done) {
guardValidation.findOne({ email: username }, function (err, user) {
if (err) { return done(err); }
if (!user) {
return done(null, false, {
message: 'Incorrect Email'
});
}
if (!user.validPassword(password)) {
return done(null, false, {
message: 'Incorrect Passwords'
});
}
return done(null, user);
});
}
));

passport.use('supervisor-local',new LocalStrategy({
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
