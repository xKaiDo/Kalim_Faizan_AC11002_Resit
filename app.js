//  - The following const stores the necessary elements to retrieve the weather from the API -
const api = {
  key: "2c2bb4073956d6a41957a6126b85e782",
  base: "https://api.openweathermap.org/data/2.5/"
};

//  - Stores the value entered by the user and it passes it one the method that requires it -
const searchbox = document.querySelector('.search-box');
//  - This eventListener will get the pressed key -
searchbox.addEventListener('keypress', setQuery);


//  - Runs the method to get the current London stats -
getLondonResults();
//  - Runs the method to get the current New York stats -
getNewYorkResults();
//  - Runs the method to get the current Tokyo stats -
getTokyoResults();


//  - The following function checks if the pressed key equals to '13' which is equivalent to the enter key on keyboard -
function setQuery(evt) {
  if (evt.keyCode == 13) {

    //  - If the key equals to 13 the data will be fetched in the API -
    getResults(searchbox.value);
  }
}

//  - Fetches the data for the city inserted by the user and returns it in json format -
function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults).then(checkWeatherStatus);
}

//  - Fetches the data for London and returns it in json format -
function getLondonResults() {
  fetch(`${api.base}weather?q=London&units=metric&APPID=${api.key}`)
    .then(resultsLondon => {
      return resultsLondon.json();
    }).then(displayLondon);
}

//  - Fetches the data for New York and returns it in json format -
function getNewYorkResults() {
  fetch(`${api.base}weather?q=new%20york&units=metric&APPID=${api.key}`)
    .then(resultsNewYork => {
      return resultsNewYork.json();
    }).then(displayNewYork);
}

//  - Fetches the data for Tokyo and returns it in json format -
function getTokyoResults() {
  fetch(`${api.base}weather?q=Tokyo&units=metric&APPID=${api.key}`)
    .then(resultsTokyo => {
      return resultsTokyo.json();
    }).then(displayTokyo);
}


//  - Displays the results for Tokyo on the appropriate slide -
function displayTokyo(resultsTokyo) {
  let now = new Date();
  let date = document.querySelector('.locationTokyo .tokyoDate');
  date.innerText = dateBuilder(now);

  let tempTokyo = document.querySelector('.currentTokyo .tempTokyo');
  tempTokyo.innerHTML = `${Math.round(resultsTokyo.main.temp)}<span>°c</span>`;

  let weatherTokyo = document.querySelector('.currentTokyo .weatherTokyo');
  weatherTokyo.innerText = resultsTokyo.weather[0].main;

  let hiLowTokyo = document.querySelector('.currentTokyo .hi-lowTokyo');
  hiLowTokyo.innerText = `${Math.round(resultsTokyo.main.temp_min)}°c / ${Math.round(resultsTokyo.main.temp_max)}°c`;
}

//  - Displays the results for New York on the appropriate slide -
function displayNewYork(resultsNewYork) {
  let now = new Date();
  let date = document.querySelector('.locationNewYork .newYorkDate');
  date.innerText = dateBuilder(now);

  let tempNewYork = document.querySelector('.currentNewYork .tempNewYork');
  tempNewYork.innerHTML = `${Math.round(resultsNewYork.main.temp)}<span>°c</span>`;

  let weatherNewYork = document.querySelector('.currentNewYork .weatherNewYork');
  weatherNewYork.innerText = resultsNewYork.weather[0].main;

  let hiLowNewYork = document.querySelector('.currentNewYork .hi-lowNewYork');
  hiLowNewYork.innerText = `${Math.round(resultsNewYork.main.temp_min)}°c / ${Math.round(resultsNewYork.main.temp_max)}°c`;
}

//  - Displays the results for London on the appropriate slide -
function displayLondon(resultsLondon) {
  let now = new Date();
  let date = document.querySelector('.locationLondon .londonDate');
  date.innerText = dateBuilder(now);

  let tempLondon = document.querySelector('.currentLondon .tempLondon');
  tempLondon.innerHTML = `${Math.round(resultsLondon.main.temp)}<span>°c</span>`;

  let weatherLondon = document.querySelector('.currentLondon .weatherLondon');
  weatherLondon.innerText = resultsLondon.weather[0].main;

  let hiLowLondon = document.querySelector('.currentLondon .hi-lowLondon');
  hiLowLondon.innerText = `${Math.round(resultsLondon.main.temp_min)}°c / ${Math.round(resultsLondon.main.temp_max)}°c`;
}

//  - Displays the result for the input given by the user -
function displayResults(weather) {

  // - Retrieves the name of the city -
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

//  - Retrieves the current date -
  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  //  - Reterieves the current temperature -
  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  //  - Retrieves the current weather summary -
  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;
  var weatherIcon = weather.weather[0].main;

  //  - Retrieves the max and min temperatures -
  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

  //  - Returns the image to be selected -
  return weatherIcon;
}

//  - Displays teh correct weateher image depending on the user input -
function checkWeatherStatus(weatherIcon) {

  //  - The variable weatherIcon is passed into teh switch statement and each outcome has an image assigned to it -
  switch (weatherIcon) {
    case "Atmosphere":
      $('.weatherImage').attr('src', 'IMAGES/weather/fog.png');
      break;
    case "Clear":
      $('.weatherImage').attr('src', 'IMAGES/weather/clear.png');
      break;
    case "Snow":
      $('.weatherImage').attr('src', 'IMAGES/weather/snow.png');
      break;
    case "Rain":
      $('.weatherImage').attr('src', 'IMAGES/weather/rain.png');
      break;
    case "Clouds":
      $('.weatherImage').attr('src', 'IMAGES/weather/clouds.png');
      break;
    case "Drizzle":
      $('.weatherImage').attr('src', 'IMAGES/weather/drizzle.png');
      break;
    case "Thunderstorm":
      $('.weatherImage').attr('src', 'IMAGES/weather/thunderstorm.png');
      break;
    default:
  }
}

//  - Takes in the date in numeric form and returns it in months and days  -
function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
