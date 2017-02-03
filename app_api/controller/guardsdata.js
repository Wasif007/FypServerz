var mongoose=require('mongoose');
var Guard=mongoose.model('Guard');
var moment = require('moment');
moment().format();

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


       
module.exports.guards=function(req,res)
{

	Guard.find({}, function(err, docs) {
    if (!err){ 
sendJSONresponse(res,200,docs);
    } else {
    	throw err;
    }
});
}

module.exports.deleteguardList=function(req,res)
{
	Guard.remove({}, function(err,removed) {
sendJSONresponse(res,200,{
	"Message":" Deleted all data"
})
});
}

module.exports.guardsAssigning=function(req,res)
{
	var image_url_cloudinary;
    image_url_cloudinary=req.file.url;
            
	if(!req.body.email || !req.body.home_address || !req.body.phone  || !req.file.url || !req.body.code || !req.body.name)
	{
		sendJSONresponse(res,404,{
			"message":"Email phone and name are required fields"
		})
		return;
	}	
	var guard=new Guard();
	guard.email=req.body.email;
	guard.phone=req.body.phone;
	guard.name=req.body.name;
	guard.code=req.body.code;
	guard.imageUrl=image_url_cloudinary;
	guard.home_address=req.body.home_address;

	guard.save(function(err) {
    if (err) {
      sendJSONresponse(res, 404, err);
    } else {
      sendJSONresponse(res, 200, {
        "Guard saved with data":guard
      });
    }
  });

}