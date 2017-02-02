var express = require('express');
var router = express.Router();
var multer = require('multer');
var cloudinary = require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');
cloudinary.config({ 
  cloud_name: 'wasif007', 
  api_key: '195135933518811', 
  api_secret: 'rRSt30F6A5BqzU8IlNRa7IjOQRQ' 
});

    var storage = cloudinaryStorage({
  cloudinary: cloudinary,
    folder: 'pingfolder'
  
});

var upload = multer({ //multer settings
                    storage: storage
                }).single('file');

var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

var ctrlValidation = require('../controller/validation');
var ctrlGettingUsers=require('../controller/users');
var ctrlGettingGuardData=require('../controller/guardsdata');
var ctrlSupervisorValidation=require('../controller/supervisorValidation');


//SignUP
router.post('/signup', ctrlValidation.signup);
router.post('/login', ctrlValidation.login);
router.get('/users',auth,ctrlGettingUsers.users);

//GuardsList
router.get('/addingguard',ctrlGettingGuardData.guards);
router.post('/addingguard',upload,ctrlGettingGuardData.guardsAssigning);

//Signup Login Supervisor
router.post('/supervisorLogin',ctrlSupervisorValidation.login);
router.post('/supervisorSignup',upload,ctrlSupervisorValidation.signup);
router.get('/supervisorList',ctrlSupervisorValidation.supervisorList);

module.exports = router;