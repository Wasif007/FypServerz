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
console.log(req.body.code+" "+req.body.email);
SupervisorValidation.findOne({
  email:req.body.email,
  code:req.body.code
}).exec();

}

module.exports.login=function(req,res)
{ 

}

module.exports.guardAddList=function(req,res)
{

}