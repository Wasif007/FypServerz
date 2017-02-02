var express=require('express');
var app=express();
var moment = require('moment');
moment().format();

var date=new Date();

console.log(moment(date).format("DD-MM-YYYY"))
console.log(moment(date,"DD-MM-YYYY"));
var timestamp=moment.utc(moment(date).valueOf());
console.log(timestamp.local().format("hh:mm a"));

app.listen(5000,function(){
	console.log("checking");
})