$(document).ready(function() {
	$.getScript("../widgets/startup.js", function(){
	   console.log('startup loaded.');
	});

	$.getScript("../widgets/welcome/welcome.js", function(){
	   console.log('welcome message widget loaded.');
	});

	$.getScript("../widgets/weather/weather.js", function(){
	   console.log('weather widget loaded.');
	});
	
	$.getScript("../widgets/today/today.js", function(){
	   console.log('clock and date widget loaded');
	});	
});