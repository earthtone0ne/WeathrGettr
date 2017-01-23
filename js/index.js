var lat, lon, tempUnit = 'f', tempUnitQuery = {c: "metric", f: "imperial", k: "standard"};

$(document).ready(function() {
	getUnitBtns();
	getLoc();
	$("#getWeather").on("click", getWeather).prop( "disabled", true );
	$("#unitBtns>button").on("click", function(e) {changeUnit(e.target.dataset.unit)})
});

function getUnitBtns() {
	$("#unitBtns>button[data-unit="+tempUnit+"]").css({
		display: 'none',
		opacity:0
	});
	$("#unitBtns>button[data-unit!="+tempUnit+"]").css({
		display: 'inline-block',
		opacity:0.8,
		transition: 'opacity 2s'
	});
}

function getLoc() {
	$("#info>h3").text("Finding your location...");
	navigator.geolocation.getCurrentPosition(function(pos) {
		lat = pos.coords.latitude.toFixed(3);
		lon = pos.coords.longitude.toFixed(3);
		$("#info>h5").html("Your location: " + lat + ",&nbsp;" + lon);
		$("button").prop( "disabled", false );
		getPlaceName();
	});
}

function getWeather() {
	lat = lat || 40.713;
	lon = lon || -74.001;
	var url = "https://weather.millergeek.xyz/data/2.5/weather?lat=" +
		lat + "&lon=" + lon + "&units="+tempUnitQuery[tempUnit]+"&APPID=" + OWMKey;
	$.getJSON(url, function(res) {
		$("#currentTemp").html('<h1>' + res.main.temp.toFixed(1) +
			'<span id="tempUnit"> &deg;'+tempUnit.toUpperCase()+'</span></h1>')
			.append('<div>' + res.weather[0].description + '</div>')
			.append('<img src="https://openweathermap.org/img/w/' +
				res.weather[0].icon + '.png" />');
	});
}

function getPlaceName() {
	var url = 'https://www.mapquestapi.com/geocoding/v1/reverse?location=' +
		lat + ',' + lon + '&key='+MQKey+'&thumbMaps=false';
	$.getJSON(url, showPlaceName)
}

function showPlaceName(data) {
	var city = data.results[0].locations[0].adminArea5;
	var state = data.results[0].locations[0].adminArea3;
	var zip = data.results[0].locations[0].postalCode.substring(0, 5);
	$("#info>h3").text(city + ", " + state + " " + zip);
}

function changeUnit (unit){
	tempUnit = unit;
	getUnitBtns();
	getWeather();
}
//yes, this shouldn't be public, but there's no other reasonable way to do this challenge in CodePen -_-
var OWMKey = 'ca280b6058642b4e5c845c013761f8ad';
var MQKey = 'tLZ9lun3BrzII2GGvAqftIFd0DSevdpb';

//TODO: refactor to pass values instead of globals
