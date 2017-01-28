$(document).ready(function() {
	$.getScript("../widgets/welcome/welcome.js", function(){
	   console.log('welcome message called.')
	});

	$.get('/weather', function(ret) {
		w = ret[0];
		$('#weather #temp').html(w.current.temperature + "&deg;F");
		$('#weather #location').html(w.location.name);
		$('#weather #wind').html(w.current.skytext);
		$('#weather #wind').prepend("<i class='wi wi-yahoo-"+w.current.skycode+"'></i>");
	});
	
	renderClock();
	renderDate();
});

function renderClock(){
	var currentTime = new Date();
	var period = "AM";
	var hour = currentTime.getHours();
	var min = currentTime.getMinutes();
	var seconds = currentTime.getSeconds();
	
	if(hour == 0){
		hour = 12;
	}else if(hour > 12){
		hour = hour - 12
		period = "PM"
	}
	
	if(hour < 10){
		hour = "0" + hour;
	}
	
	if(min < 10){
		min = "0" + min;
	}
	
	if(seconds < 10){
		seconds = "0" + seconds;
	}
	
	$('#clock').html(hour + ":" + min + ":" + seconds + " " + period);
	setTimeout('renderClock()', 1000);
}

function renderDate(){
	var monthNames = [  "Jan.", "Feb.", "Mar.",
  "Apr.", "May", "June", "July",
  "Aug.", "Sept.", "Oct.",
  "Nov.", "Dec."];
	
	var date = new Date();
	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();

	$('#date').html(monthNames[monthIndex] + " " + day + ", " + year);
}