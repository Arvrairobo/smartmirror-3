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
	
	$('#clock').html(hour + ":" + min + "<span id='seconds'>" + seconds + "</span><span id='ampm'>" + period + "</span>");
	setTimeout('renderClock()', 1000);
}

function renderDate(){
	var monthNames = [  "Jan.", "Feb.", "Mar.",
  		"Apr.", "May", "June", "July",
  		"Aug.", "Sept.", "Oct.",
  		"Nov.", "Dec."
  	];
	
	var dayOfWeek = [ "Mon.", "Tues.", "Wed.",
		"Thur.", "Fri.", "Sat.", "Sun."
	];
	var date = new Date();
	var dayNumber = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();
	var dayIndex = date.getDay();

	$('#date').html(dayOfWeek[dayIndex] + " " + monthNames[monthIndex] + " " + dayNumber + ", " + year);
}

renderClock();
renderDate();