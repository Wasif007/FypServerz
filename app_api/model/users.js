 var mongoose=require('mongoose');
var crypto=require('crypto');
var jwt=require('jsonwebtoken');
require('mongoose-type-email');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema=new mongoose.Schema({
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
	}
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt=function(){
 var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.JWT_SECRET); 

}
userSchema.plugin(uniqueValidator);
mongoose.model('User', userSchema);