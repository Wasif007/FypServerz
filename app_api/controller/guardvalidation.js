var mongoose=require('mongoose');
var guardValidation=mongoose.model('guardAdd');
var passport=require('passport');
var Guard=mongoose.model('Guard');
var LocalStrategy = require('passport-local').Strategy;



var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};



module.exports.signup=function(req,res)
{
if(!req.body.code || !req.body.password || !req.body.email)
{
sendJSONresponse(res,404,{
  "message":"Security code Password and Email are required Fields"
});
return;
}
console.log(req.body.code+" "+req.body.email);
Guard.findOne({"email": req.body.email,
"code":req.body.code}, function (err, doc){
  if(err)
  {
    sendJSONresponse(res,404,{
      "message":err
    });
    return;
  }
  else if(doc===null)
  {
    sendJSONresponse(res,404,{
      "message":"Code or Email doesnot matches"
    })
    return;
  }
  var guardValidationAdd=new guardValidation();
  guardValidationAdd.email=req.body.email;
  guardValidationAdd.code=req.body.code; 

 guardValidationAdd.setPassword(req.body.password);

guardValidationAdd.save(function(err) {
    var token;
    if (err) {
      sendJSONresponse(res, 404, err);
    } else {
      token = guardValidationAdd.generateJwt();
      sendJSONresponse(res, 200, {
        "token" : token
      });
    }
  });
})

}

module.exports.guardAddList=function(req,res)
{
 guardValidation.find({}, function(err, docs) {
    if (!err){ 
sendJSONresponse(res,200,docs);
    } else {
      throw err;
    }
});
}


module.exports.guardDeleteList=function(req,res)
{
  guardValidation.remove({}, function(err,removed) {
    if(!err)
    {
     sendJSONresponse(res,200,{
  "Message":" Deleted all data"
})
    }

});
}

module.exports.login=function(req,res)
{ 

  if(!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "Email and password are requireds"
    });
    return;
  }

  passport.authenticate('guard-local', function(err, user, info){
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
module.exports.guardAddList=function(req,res)
{
 guardValidation.find({}, function(err, docs) {
    if (!err){ 
sendJSONresponse(res,200,docs);
    } else {
      throw err;
    }
});
}








