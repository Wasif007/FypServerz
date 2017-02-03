var mongoose=require('mongoose');
var guardValidation=mongoose.model('guardAdd');
var passport=require('passport');
var SupervisorValidation=mongoose.model('SupervisorValidation');

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

SupervisorValidation.findOne({
  email:req.body.email,
  code:req.body.code
}).exec(function(user){
sendJSONresponse(res,200,{
  "User is":user
})
},function(err){
sendJSONresponse(res,404,err);
});

}

module.exports.login=function(req,res)
{ 

}

module.exports.guardAddList=function(req,res)
{

}