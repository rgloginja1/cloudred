'use strict';
var express = require('express');
var router = express.Router();
var uploadManager = require('./uploadManager')(router);

/* GET home page. */
router.get('/', function(req, res) {

  res.render('index', { title: 'CloudRed' });
});


//router.get('/login', function(req, res) {
//  res.render('login', { title: 'CloudRed' });
//});

module.exports = router;
