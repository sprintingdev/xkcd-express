var mongo = require("mongodb");
var MongoClient = mongo.MongoClient;

var url = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost:27017/xkcd';

var DBService = function(){

};

DBService.prototype.connect = function(callback){
    MongoClient.connect(url, function (err, database) {
        if (err) {
            return console.dir(err);
        }
        else {
            console.log("Connected to 'xkcd' database");
            exports.db = database;
            callback();
        }
    });
};
exports.dbService = new DBService();