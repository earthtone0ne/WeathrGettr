let STATE = {tempUnit: 'f', tempUnitQuery: {c: 'metric', f: 'imperial', k: 'standard'}}

$(document).ready(function() {
	getLoc();
	getUnitBtns();
	$("#getWeather").on('click', getWeather).prop('disabled', true );
	$("#unitBtns>button").on('click', function(e) {changeUnit(e.target.dataset.unit)})
});

function getUnitBtns() {
	$("#unitBtns>button[data-unit="+STATE.tempUnit+"]").css({
		display: 'none',
		opacity:0
	});
	$("#unitBtns>button[data-unit!="+STATE.tempUnit+"]").css({
		display: 'inline-block',
		opacity:0.8,
		transition: 'opacity 2s'
	});
}

function getLoc() {
	$("#info>h3").text('Finding your location...');
	navigator.geolocation.getCurrentPosition(function(pos) {
		STATE.lat = pos.coords.latitude.toFixed(3);
		STATE.lon = pos.coords.longitude.toFixed(3);
		$("#info>h5").html(`Your location: ${STATE.lat},&nbsp;${STATE.lon}`);
		$("button").prop('disabled', false );
		getPlaceName();
	});
}

function getWeather() {
	lat = STATE.lat || 40.713;
	lon = STATE.lon || -74.001;
	let units = STATE.tempUnit;
	let unitQuery=STATE.tempUnitQuery[units];
	let url = `api/getWeather?lat=${lat}&lon=${lon}&units=${unitQuery}`;
	$.get(url, function(res) {
		$("#currentTemp").html(`
		  <h1>${res.main.temp.toFixed(1)}
				<span id="tempUnit"> &deg;${units.toUpperCase()}</span>
			</h1>`)
			.append(`<div>${res.weather[0].description}</div>`)
			.append(`<img src="https://openweathermap.org/img/w/${res.weather[0].icon}.png" />`);
	});
}

function getPlaceName() {
	let url = `api/getPlaceName?lat=${STATE.lat}&lon=${STATE.lon}`;
	$.getJSON(url, showPlaceName)
}

function showPlaceName(data) {
	var city = data.results[0].locations[0].adminArea5;
	var state = data.results[0].locations[0].adminArea3;
	var zip = data.results[0].locations[0].postalCode.substring(0, 5);
	$("#info>h3").text(city + ", " + state + " " + zip);
}

function changeUnit (unit){
	STATE.tempUnit = unit;
	getUnitBtns();
	getWeather();
}

//TODO: refactor to pass values instead of globals
