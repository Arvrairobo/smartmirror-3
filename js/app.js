$(document).ready(function() {
	$.getScript("../widgets/welcome/welcome.js", function(){
	   console.log('welcome message called.')
	});

	$.get('/weather', function(ret) {
		w = ret[0];
		$('#weather #temp').html(w.current.temperature + "&deg;F");
		$('#weather #location').html(w.location.name);
		$('#weather #wind').html(w.current.winddisplay);
	});
});