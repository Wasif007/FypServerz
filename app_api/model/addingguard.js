var mongoose=require('mongoose');
require('mongoose-type-email');
var uniqueValidator = require('mongoose-unique-validator');

var guardSchema=new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:mongoose.SchemaTypes.Email,
		required:true,
		unique:true
	},
	phone:{
		type:String,
		required:true
	},
	imageUrl:{
		type:String,
		required:true
	},
	code:{
		type:String,
		required:true
	},
	createdOn:
	 {
	  type: String
	 }
	 ,
	 home_address:{
	 	type:String,
	 	required:true
	 }

});

guardSchema.plugin(uniqueValidator);
mongoose.model('Guard', guardSchema);