$(document).ready(function() {
	$.getScript("../widgets/welcome/welcome.js", function(){
	   console.log('welcome message called.');
	});

	$.get('/weather', function(ret) {
		w = ret[0];
		$('#weather #temp').html(w.current.temperature + "&deg;F");
		$('#weather #location').html(w.location.name);
		$('#weather #wind').html(w.current.skytext);
		$('#weather #wind').prepend("<i class='wi wi-yahoo-"+w.current.skycode+"'></i>");

		for(var i = 1; i < 5; i++){
			var dayTag = "#day" + i;
			$('#forecast ' + dayTag + ' #day').html(w.forecast[i].shortday);
			$('#forecast ' + dayTag + ' #high').html(w.forecast[i].high);
			$('#forecast ' + dayTag + ' #skyIcon').html("<i class='wi wi-yahoo-"+w.forecast[i].skycodeday+"'></i>");
			$('#forecast ' + dayTag + ' #low').html(w.forecast[i].low);
		}
	});
	
	$.getScript("../widgets/welcome/today.js", function(){
	   console.log('clock and date are rendered');
	});	
});