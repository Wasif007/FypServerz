 var mongoose=require('mongoose');
var crypto=require('crypto');
var jwt=require('jsonwebtoken');
require('mongoose-type-email');
var uniqueValidator = require('mongoose-unique-validator');

var supervisorSchema=new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	hash:String,
	salt:String,
	email:{
		type:mongoose.SchemaTypes.Email,
		required:true,
		unique:true
	},
	imageUrl:{
		type:String,
		required:true
	},
	phone:{
		type:String,
		required:true
	},
	home_address:{
		type:String,
		required:true
	}
});

supervisorSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

supervisorSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

supervisorSchema.methods.generateJwt=function(){
 var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.JWT_SECRET); 

}
supervisorSchema.plugin(uniqueValidator);
mongoose.model('SupervisorValidation', supervisorSchema);