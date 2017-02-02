var mongoose=require('mongoose');
var User=mongoose.model('User');
var passport=require('passport');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


module.exports.signup=function(req,res)
{
if(!req.body.name || !req.body.password || !req.body.email)
{
sendJSONresponse(res,404,{
	"message":"Username Password and Email are required Fields"
});
return;
}

var userToAdd=new User();
userToAdd.email=req.body.email;
userToAdd.name=req.body.name ;

userToAdd.setPassword(req.body.password);

userToAdd.save(function(err) {
    var token;
    if (err) {
      sendJSONresponse(res, 404, err);
    } else {
      token = userToAdd.generateJwt();
      sendJSONresponse(res, 200, {
        "token" : token
      });
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