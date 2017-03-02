//require modules
var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");

//node package for news widget
var superagent = require('superagent-cache')();

//node package for stocks widget
var YahooFinanceAPI = require('yahoo-finance-data');
var yahooAPI = new YahooFinanceAPI();

//node package for weather widget
var weather = require("weather-js");

var youtube = require('youtube-search');
//user variables
var config = require('./config.json');

app.use("/css", express.static(path.resolve(__dirname + "/css")));
app.use("/font", express.static(path.resolve(__dirname + "/font")));
app.use("/js", express.static(path.resolve(__dirname + "/js")));
app.use("/widgets", express.static(path.resolve(__dirname + "/widgets")));

app.get('/', function(req, res) {
	res.send(fs.readFileSync(path.resolve(__dirname + "/index.html"), {encoding: "utf8"}));
});

app.get('/user-config', function(req, res) {
	res.send(fs.readFileSync(path.resolve(__dirname + "/user-config.html"), {encoding: "utf8"}));
});

app.get('/youtube', function(req,res){
  var videoQuery = req.query.subject;
  var apiKey = null;
  for(var item in config){
		if(config[item].module.trim() === "voiceFeedback"){
			apiKey = config[item].parameters.apiKey;
		}
	}
  var opt = {
    maxResults: 5,
    type: 'video',
    key: apiKey
  }
  if(apiKey !== null){
  	youtube(videoQuery, opt, function(err, result){
      if(err) return console.log(err)
      
      res.send(result);
  	});
  }
  
});

app.get('/commands', function(req, res){
	res.send(JSON.parse(fs.readFileSync('commands.json', 'utf8')));
});

app.get('/weather', function(req, res) {
	var zipCode = null;
	var type = null;
	for(var item in config){
		if(config[item].module.trim() === "weather"){
			zipCode = config[item].parameters.zipCode;
			type = config[item].parameters.degreeType;
		}
	}

	if((zipCode !== null) && (type !== null)){
		weather.find({search: zipCode, degreeType: type}, function(err, result) {
			if(err) console.log(err);
			res.send(result);
		});
	}
});

app.get('/news', function(req, res) {
	var apiKey = null;
	for(var item in config){
		if(config[item].module.trim() === "news"){
			apiKey = config[item].parameters.apiKey;
		}
	}

	var uri = "https://newsapi.org/v1/articles?source=google-news&apiKey=";
	if(apiKey !== null){
		superagent
		  	.get(uri + apiKey)
		  	.end(function (err, response){
		    // response is now cached, subsequent calls to this superagent request will now fetch the cached response
				res.send(response.body);
	  		}
		);
	}
});

app.get('/stocks', function(req, res) {
	var stockList = null;

	for(var item in config){
		if(config[item].module.trim() === "stocks"){
			stockList = config[item].parameters.stocksList;
		}
	}

	if(stockList !== null){
		yahooAPI.getQuote(stockList).then(function(result){
			res.send(result.quote);
		});
	}
});

app.get('/config', function(req, res) {
	config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
	res.send(JSON.parse(fs.readFileSync('config.json', 'utf8')));
});

app.listen(8080, function() {
	console.log('Server running on port 8080!');
	console.log('Visit http://localhost:8080/ to view.');
});
