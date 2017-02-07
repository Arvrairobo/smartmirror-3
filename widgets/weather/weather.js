$.get('/weather', function(ret) {

	wrapperSetup();
	addWidget(ret[0]);
	console.log("called");
});

function wrapperSetup(){
	$('#weather').html(`<div id="temp"></div>
		<div id="location"></div>
		<div id="wind"></div>
		<div id="forecast">
			<div class="row">
				<div class="col">
					<div id="day1">
						<div id="day"></div>
						<div id="high"></div>
						<div id="skyIcon"></div>
						<div id="low"></div>
					</div>
				</div>
				<div class="col">
					<div id="day2">
						<div id="day"></div>
						<div id="high"></div>
						<div id="skyIcon"></div>
						<div id="low"></div>
					</div>
				</div>
				<div class="col">
					<div id="day3">
						<div id="day"></div>
						<div id="high"></div>
						<div id="skyIcon"></div>
						<div id="low"></div>
					</div>
				</div>
				<div class="col">
					<div id="day4">
						<div id="day"></div>
						<div id="high"></div>
						<div id="skyIcon"></div>
						<div id="low"></div>
					</div>
				</div>
			</div>
		</div>`);
}

function addWidget(weather){
	$('#weather #temp').html(weather.current.temperature + "&deg;F");
	$('#weather #location').html(weather.location.name);
	$('#weather #wind').html(weather.current.skytext);
	$('#weather #wind').prepend("<i class='wi wi-yahoo-"+weather.current.skycode+"'></i>");

	for(var i = 1; i < 5; i++){
		var dayTag = "#day" + i;
		$('#forecast ' + dayTag + ' #day').html(weather.forecast[i].shortday);
		$('#forecast ' + dayTag + ' #high').html(weather.forecast[i].high);
		$('#forecast ' + dayTag + ' #skyIcon').html("<i class='wi wi-yahoo-"+weather.forecast[i].skycodeday+"'></i>");
		$('#forecast ' + dayTag + ' #low').html(weather.forecast[i].low);
	}
}