var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

/* GET home page. */
router.get('/', ctrlMain.index);

module.exports = router;
