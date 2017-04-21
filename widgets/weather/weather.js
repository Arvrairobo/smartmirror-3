//have to make it syncronous or else it will interfere with stocks.js
$.getJSON({
	type: 'GET',
	dataType: "json",
	async: false,
	url: '/weather',
	success: function(data){
		wrapperSetup(data);
	}
});

function wrapperSetup(weatherdata){
	$('#weather').html(`<div id="temp"></div>
		<div id="location"></div>
		<div id="wind"><canvas id="todayWeatherIcon"></canvas></div>
		<div id="forecast">
			<div class="row">
				<div class="col">
					<div id="day1">
						<div id="day"></div>
						<div id="high"></div>
						<div id="skyIcon"><canvas id="day1ForcastIcon" class="forecastIcon"></canvas></div>
						<div id="low"></div>
					</div>
				</div>
				<div class="col">
					<div id="day2">
						<div id="day"></div>
						<div id="high"></div>
						<div id="skyIcon"><canvas id="day2ForcastIcon" class="forecastIcon"></canvas></div>
						<div id="low"></div>
					</div>
				</div>
				<div class="col">
					<div id="day3">
						<div id="day"></div>
						<div id="high"></div>
						<div id="skyIcon"><canvas id="day3ForcastIcon" class="forecastIcon"></canvas></div>
						<div id="low"></div>
					</div>
				</div>
				<div class="col">
					<div id="day4">
						<div id="day"></div>
						<div id="high"></div>
						<div id="skyIcon"><canvas id="day4ForcastIcon" class="forecastIcon"></canvas></div>
						<div id="low"></div>
					</div>
				</div>
			</div>
		</div>`);
		addWidget(weatherdata);
		setInterval('updateWeather()', 600000);
}

function addWidget(weather){
	var date = new Date();
	var skycons = new Skycons({"color":"white"});
	var dayOfWeek = ["Sun","Mon", "Tues", "Wed","Thur", "Fri", "Sat"];
	var todayDayIndex =  date.getDay();
	var temp = 0;
	
	$('#weather #temp').html(Math.ceil(parseInt(weather.today.temperature)) + "&deg;F");
	$('#weather #location').html("Toledo, OH");
	skycons.add($('#todayWeatherIcon')[0], weather.today.icon);
	skycons.play();
	$('#weather #wind').append(weather.today.weatherDescription);

	for(var i = 1; i <= 4; i++){
		var dayTag = "#day" + i;
		var forceCastIconTag = "#day" + i + "ForcastIcon";
		$('#forecast ' + dayTag + ' #high').html(weather.forecast[i - 1].high);
		var forecastSkycon = new Skycons({"color":"white"});
		forecastSkycon.add($(forceCastIconTag)[0], weather.forecast[i - 1].icon);
		forecastSkycon.play();
		$('#forecast ' + dayTag + ' #low').html(weather.forecast[i - 1].low);
		if((todayDayIndex + i) > 6){
			$('#forecast ' + dayTag + ' #day').html(dayOfWeek[temp]);
			temp++;
		}else{
			$('#forecast ' + dayTag + ' #day').html(dayOfWeek[todayDayIndex + i]);
		}
	}
	
}

function updateWeather() {
    $.getJSON({
        type: 'GET',
        dataType: "json",
        async: false,
        url: '/weather',
        success: function(data) {
            addWidget(data);
            console.log("Weather updated");
        }
    });
}
