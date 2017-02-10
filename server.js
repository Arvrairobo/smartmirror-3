//require modules
var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");
var superagent = require('superagent-cache')();
var YahooFinanceAPI = require('yahoo-finance-data');
//node package for weather widget
var weather = require("weather-js");

//user variables
var config = require('./config.json');
var zipCode = '43612';
var yahooAPI = new YahooFinanceAPI();

app.use("/css", express.static(path.resolve(__dirname + "/css")));
app.use("/font", express.static(path.resolve(__dirname + "/font")));
app.use("/js", express.static(path.resolve(__dirname + "/js")));
app.use("/widgets", express.static(path.resolve(__dirname + "/widgets")));

app.get('/', function(req, res) {
	res.send(fs.readFileSync(path.resolve(__dirname + "/index.html"), {encoding: "utf8"}));
});

app.get('/weather', function(req, res) {
	weather.find({search: zipCode, degreeType: 'F'}, function(err, result) {
		if(err) console.log(err);
		res.send(result);
	});
});

app.get('/news', function(req, res) {
	var uri = "https://newsapi.org/v1/articles?source=google-news&apiKey=2608f524434e4e2fb24546a02bcf624d";
	superagent
	  .get(uri)
	  .end(function (err, response){
	    // response is now cached, subsequent calls to this superagent request will now fetch the cached response
			res.send(response.body);
	  }
	);
});

//reminder to obtain stockList info from config.json later
var stockList = ['GOOG','AAPL','YHOO','TSLA']; 
app.get('/stocks', function(req, res) {
	yahooAPI.getQuote(stockList).then(function(result){
		res.send(result.quote);
	});
	
});

app.get('/config', function(req, res) {
	res.send(JSON.parse(fs.readFileSync('config.json', 'utf8')));
});

app.listen(8080, function() {
	console.log('Server running on port 8080!');
	console.log('Visit http://localhost:8080/ to view.');
});
