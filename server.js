//require modules
var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");

app.use("/css", express.static(path.resolve(__dirname + "/css")));
app.use("/js", express.static(path.resolve(__dirname + "/js")));
app.use("/widgets", express.static(path.resolve(__dirname + "/widgets")));

app.get('/', function(req, res) {
	res.send(fs.readFileSync(path.resolve(__dirname + "/index.html"), {encoding: "utf8"}));
});

app.listen(8080, function() {
	console.log('Server running on port 8080!');
	console.log('Visit http://localhost:8080/ to view.');
});