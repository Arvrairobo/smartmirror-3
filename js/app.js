$(document).ready(function() {
	$.getScript("../widgets/welcome/startup.js", function(){
	   console.log('startup');
	});

	$.getScript("../widgets/welcome/welcome.js", function(){
	   console.log('welcome message called.');
	});

	$.getScript("../widgets/welcome/weather.js", function(){
	   console.log('weather called.');
	});
	
	$.getScript("../widgets/welcome/today.js", function(){
	   console.log('clock and date are rendered');
	});	
});