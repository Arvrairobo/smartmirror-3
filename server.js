//require modules
var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");
var weather = require("weather-js");

//variables
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var zipCode = '43612';

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

app.get('/config', function(req, res) {
	res.send(config);
});

app.listen(8080, function() {
	console.log('Server running on port 8080!');
	console.log('Visit http://localhost:8080/ to view.');
});

