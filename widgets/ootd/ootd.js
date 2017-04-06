var heavyWeather = [
  "A heavy coat would do nicely today.",
  "Pullover, winter hat, gloves, scarf, and heavy coat.",
  "It's pretty cold today, might want a heavy jacket."
];

var meduimWeather = [
  "A light jacket would be great for today.",
  "A sweater would be sufficient.",
  "A hoodie would do nicely for this kind of weather."
];

var lightWeather = [
  "Sun's out, guns out!",
  "Wear your favorite T-Shirt and enjoy the weather!",
  "Something light would be a great fit for this weather."
];

var extremeWeather = [
  "Don't even go outside!",
  "A blanket! BURRRRRRR.",
  "Baby it's cold, out, sidddddeeeeee!"
];

var rainWeather = [
  "Don't forget the Umbrella.",
  "There is a chance for rain, don't forget an umbrella.",
  "Rain coat and rain boots would be nice!"
];

var rainCode = [5, 6, 7, 10, 11, 12, 18, 39, 40, 41, 45, 46];

$.getJSON({
	type: 'GET',
	dataType: "json",
	async: false,
	url: '/weather',
	success: function(data){
		wrapperSetup(data);
	}
});

function wrapperSetup(weatherData) {
    $('#ootd').html('<div id="ootdHeader"><strong>OOTD</strong></div><div id="ootdPrompt"></div>');
    addWidget(weatherData);
    setInterval('updateOOTD()', 600000);
}


function addWidget(weatherData) {
    var currentTemp = parseInt(weatherData[0].current.temperature);
    var skyCode = weatherData[0].current.skycode;
    var rand;
    var rand2 = Math.floor(Math.random() * rainWeather.length);

    if (currentTemp < 45 && currentTemp > 0) {
        rand = Math.floor(Math.random() * heavyWeather.length);
        $('#ootdPrompt').html(heavyWeather[rand]);
    } else if (currentTemp >= 45 && currentTemp <= 60) {
        rand = Math.floor(Math.random() * meduimWeather.length);
        $('#ootdPrompt').html(meduimWeather[rand]);
    } else if (currentTemp > 60) {
        rand = Math.floor(Math.random() * lightWeather.length);
        $('#ootdPrompt').html(lightWeather[rand]);
    } else {
        rand = Math.floor(Math.random() * extremeWeather.length);
        $('#ootdPrompt').html(extremeWeather[rand]);
    }

    if ($.inArray(skyCode, rainCode) > -1) {
        $('#ootdPrompt').append("<br>" + rainWeather[rand2]);
    }

}

function updateOOTD() {
    $.getJSON({
        type: 'GET',
        dataType: "json",
        async: false,
        url: '/weather',
        success: function(data) {
          addWidget(data);
          console.log("OOTD updated");
        }
    });
}

/*0, 1 ,2, 3 ,4, 17, 35 - Thunderstorm
5 - Rain/Snow mix
6 - Sleet/Snow mix
7 - Rain/Snow/Sleet mix
8,9 - Icy
10 - Rain/Sleet mix
11 - Light Rain
12 - Rain
13 - Light Snow
14,16,42,43 - Snow
15 - Blizzard
18,40 - Showers
19 - Dust
20 - Fog
21 - Haze
22 - Smoke
23,24 - Windy
25 - Frigid
26 - Cloudy
27,29,33 - Partly Cloudy (night)
28,30,34 - Partly Cloudy
31 - Clear (night)
32 - Clear
36 - Hot
37,38 - Scattered Thunderstorms
39 - Scattered Showers
41 - Scattered Snow Showers
44 - N/A
45 - Scattered Rain Showers (night)
46 - Scattered Snow Showers (night)
47 - Scattered Thunderstorms (night)*/
