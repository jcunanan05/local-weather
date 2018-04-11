var baseUrl = 'https://fcc-weather-api.glitch.me/api/current?';
var latitude = `lat=35`;
var longitude = `lon=139`;
var url = `${baseUrl}${latitude}&${longitude}`;
var weatherData = {};
var temperature = document.querySelector('.js-temperature');
var place = document.querySelector('.js-place');
var condition = document.querySelector('.js-condition');
var body = document.querySelector('body > div');
var weatherConditions = {
  "Thunderstorm": {className: 'thunderstorm'},
  "Drizzle": {className: 'drizzle'},
  "Rain": {className: 'rain'},
  "Snow": {className: 'snow'},
  "Atmosphere": {className: 'atmosphere'},
  "Clear": {className: 'clear'},
  "Clouds": {className: 'clouds'},
  "Extreme": {className: 'extreme'},
  "Additional": {className: 'additional'}
};


//use fetch Api for AJAX
function getWeatherData() {
  fetch(url)
    .then(function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
    
      // Examine the text in the response
      response.json().then(handleJsonData);
    })
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}


//get geolocation
function getLocation() {
  if(! ("geolocation" in navigator)) return; //geolocation not available

  navigator.geolocation.getCurrentPosition(position => {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    console.log(`lat: ${lat} long: ${long}`);

    setCoordinates(lat, long);
    updateUrl();
    getWeatherData();
  });
}


function setCoordinates(lat, long) {
  latitude = `lat=${lat}`;
  longitude = `lon=${long}`;
}

function updateUrl() {
  url = `${baseUrl}${latitude}&${longitude}`;
}


function handleJsonData(data) {
  setWeatherData(data);
  console.log(weatherData);
  updateWeather();
}


function setWeatherData(data) {
  weatherData = data;
}


function updateWeather() {
  var weatherCondition = weatherData.weather[0].main;
  place.textContent = `${weatherData.name}, ${weatherData.sys.country}`;
  temperature.textContent = `${weatherData.main.temp} °C`;
  condition.textContent = weatherCondition;

  addWeatherColor(weatherCondition);
}


function addWeatherColor(weatherCondition) {
  if (weatherConditionExist(weatherCondition)) {
    body.classList.add(weatherConditions[weatherCondition].className);
  }
}


function weatherConditionExist(weatherCond) {
  return weatherConditions.hasOwnProperty(weatherCond);
}


getLocation();