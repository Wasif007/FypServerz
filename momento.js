var express=require('express');
var app=express();
var moment = require('moment');
moment().format();

var date=new Date();
console.log(typeof date);
console.log(moment(date).format("DD-MM-YYYY"));
console.log(typeof moment(date).format("DD-MM-YYYY"));

app.listen(5000,function(){
	console.log("checking");
})