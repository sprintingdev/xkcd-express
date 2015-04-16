var express = require('express');
var xkcdService = require('../services/xkcd_service');
var router = express.Router();

var callbackForFetch = function(error, req, res, next, body) {
	if(!error) {	
		res.json(body);
	}
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'XKCD Express' });
});

/* GET Latest */
router.get('/latest', function(req, res, next){
	xkcdService.fetchLatest(function(error, body){
		callbackForFetch(error, req, res, next, body);
	});
});

/* GET comic numbered */
router.get('/get/:number', function(req, res, next){
	xkcdService.fetchByNumber(parseInt(req.params.number), function(error, body) {
		callbackForFetch(error, req, res, next, body);
	});
}); 

module.exports = router;
