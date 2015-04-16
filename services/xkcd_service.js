var request = require('request');
var db = require('./db_service').db;
var XkcdService = function(){

};

var fetchByNumber = function(number, collection, callback) {
	collection.findOne({num: number}, function(err, item) {
		if(err) {
			callback(err);
		} if(item) {
			callback(null, item)
		} else {
			var url = 'http://xkcd.com/info.0.json';
			if(number) {
				url = 'http://xkcd.com/' + number + '/info.0.json';
			}

			request({
		    	url: url,
		    	json: true
				}, function (error, response, body) {
					collection.insert(body, {}, function(err, result) {
						callback(null, body);
					});
			});		
		}
	});
	
}

var fetch = function(number, callback) {
	db.collection('comics', function(err, collection) {
		if(err) {
			callback(err);
		} else {
			if(!number) {
				collection.count(function(error, count) {
					fetchByNumber(count, collection, callback);
				});
			} else {
				fetchByNumber(number, collection, callback); 	
			}
			
		}
	});
}

XkcdService.prototype.fetchLatest = function(callback) {
	fetch(null, callback);
}

XkcdService.prototype.fetchByNumber = function(number, callback) {
	fetch(number, callback);
}

module.exports = new XkcdService();