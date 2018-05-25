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
  "Thunderstorm": {className: 'thunderstorm', idMin: 200, idMax: 232},
  "Drizzle": {className: 'drizzle', idMin: 300, idMax: 321},
  "Rain": {className: 'rain', idMin: 500, idMax: 531},
  "Snow": {className: 'snow', idMin: 600, idMax: 622},
  "Atmosphere": {className: 'atmosphere', idMin: 701, idMax: 781},
  "Clear": {className: 'clear', idMin: 800, idMax: 800},
  "Clouds": {className: 'clouds', idMin: 801, idMax: 804},
  "Extreme": {className: 'extreme', idMin: 900, idMax: 906},
  "Additional": {className: 'additional', idMin: 951, idMax: 962}
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
  var weatherConditionId = Number(weatherData.weather[0].id);

  place.innerHTML = `${weatherData.name} <span>${weatherData.sys.country}</span>`;
  temperature.innerHTML = `<span class="header--large">${Math.trunc(weatherData.main.temp)}</span> °C`;
  condition.textContent = weatherCondition;

  // addWeatherColor(weatherConditionId);
}


function addWeatherColor(weatherCondId) {
  //find weather condition id range
  for (var element in weatherConditions) {
    // console.log(`${weatherCondId} >= ${weatherConditions[element].idMin} <= ${weatherConditions[element].idMax}`);
    if (weatherCondId >= weatherConditions[element].idMin && weatherCondId <= weatherConditions[element].idMax) { 
      body.classList.add(weatherConditions[element].className);
      break;
    }
  }
}


getLocation();