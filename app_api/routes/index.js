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

//Guard Validation
var ctrlGettingGuardValidation=require('../controller/guardvalidation');
//Guard Adding
var ctrlGettingGuardData=require('../controller/guardsdata');
//Supervisor Validation
var ctrlSupervisorValidation=require('../controller/supervisorValidation');


//SignUP Login Guard
router.post('/guardSignup', ctrlGettingGuardValidation.signup);
router.post('/guardLogin', ctrlGettingGuardValidation.login);
router.get('/guardList',ctrlGettingGuardValidation.guardAddList);
router.delete('/guardListDelete',ctrlGettingGuardValidation.guardDeleteList);

//GuardsList
router.get('/addingguard',ctrlGettingGuardData.guards);
router.post('/addingguard',upload,ctrlGettingGuardData.guardsAssigning);
router.delete('/addingguardDelete',ctrlGettingGuardData.deleteguardList);


//Signup Login Supervisor 

router.post('/supervisorLogin',ctrlSupervisorValidation.login);
router.post('/supervisorSignup',upload,ctrlSupervisorValidation.signup);
router.get('/supervisorList',ctrlSupervisorValidation.supervisorList);
router.delete('/supervisorDelete',ctrlSupervisorValidation.deletesupervisorList);




module.exports = router;