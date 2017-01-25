var express = require("express");
var app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.send('Hello World');
});

app.listen(8080, function() {
	console.log('Server running on port 8080!');
	console.log('Visit http://localhost:8080/ to view.');
});