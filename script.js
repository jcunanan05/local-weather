var baseUrl = 'https://fcc-weather-api.glitch.me/api/current?';
var latitude = `lat=35`;
var longitude = `lon=139`;
var url = `${baseUrl}${latitude}&${longitude}`;
var weatherData = {};
var temperature = document.querySelector('.js-temperature');
var place = document.querySelector('.js-place');
var condition = document.querySelector('.js-condition');

//use fetch Api for AJAX
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


function handleJsonData(data) {
  setWeatherData(data);
  console.log(weatherData);
  updateWeather();
}


function setWeatherData(data) {
  weatherData = data;
}


function updateWeather() {
  place.textContent = weatherData.name;
  temperature.textContent = `${weatherData.main.temp} °C`;
  condition.textContent = weatherData.weather[0].main;
}