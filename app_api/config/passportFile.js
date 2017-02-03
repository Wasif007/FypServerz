var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var guardValidation=mongoose.model('guardAdd');

passport.use(new LocalStrategy({
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
message: 'Incorrect Password'
});
}
return done(null, user);
});
}
));