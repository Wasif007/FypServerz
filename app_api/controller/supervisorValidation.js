var mongoose=require('mongoose');
var SupervisorValidation=mongoose.model('SupervisorValidation');
var passport=require('passport');

var LocalStrategy = require('passport-local').Strategy;
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
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


module.exports.signup=function(req,res)
{
if(!req.body.name || !req.body.password || !req.body.home_address ||!req.body.email || !req.file.url || !req.body.phone )
{
sendJSONresponse(res,404,{
	"message":"Username,Password,Image,home_address and Email are required Fields"
});
return;
}

var supervisorToAdd=new SupervisorValidation();
supervisorToAdd.email=req.body.email;
supervisorToAdd.name=req.body.name ;
supervisorToAdd.phone=req.body.phone;
supervisorToAdd.imageUrl=req.file.url;
supervisorToAdd.home_address=req.body.home_address;

supervisorToAdd.setPassword(req.body.password);

supervisorToAdd.save(function(err) {
    var token;
    if (err) {
      sendJSONresponse(res, 404, err);
    } else {
      token = supervisorToAdd.generateJwt();
      sendJSONresponse(res, 200, {
        "token" : token
      });
    }
  });

}
module.exports.supervisorList=function(req,res)
{

  SupervisorValidation.find({}, function(err, docs) {
    if (!err){ 
sendJSONresponse(res,200,docs);
    } else {
      throw err;
    }
});
}

module.exports.login=function(req,res)
{ if(!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "Email and password required"
    });
    return;
  }

  passport.authenticate('local', function(err, user, info){
    var token;

    if (err) {
      sendJSONresponse(res, 404, err);
      return;
    }

    if(user){
      token = user.generateJwt();
      sendJSONresponse(res, 200, {
        "token" : token
      });
    } else {
      sendJSONresponse(res, 401, info);
    }
  })(req, res);

}

module.exports.deletesupervisorList=function(req,res)
{
  SupervisorValidation.remove({}, function(err,removed) {
sendJSONresponse(res,200,{
  "Message":" Deleted all data"
})
});
}