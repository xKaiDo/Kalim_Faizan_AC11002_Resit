const api = {
  key: "2c2bb4073956d6a41957a6126b85e782",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);



getLondonResults();
getNewYorkResults();
getTokyoResults();

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function getLondonResults() {
  fetch(`${api.base}weather?q=London&units=metric&APPID=${api.key}`)
    .then(resultsLondon => {
      return resultsLondon.json();
    }).then(displayLondon);
}

function getNewYorkResults() {
  fetch(`${api.base}weather?q=new%20york&units=metric&APPID=${api.key}`)
    .then(resultsNewYork => {
      return resultsNewYork.json();
    }).then(displayNewYork);
}

function getTokyoResults() {
  fetch(`${api.base}weather?q=Tokyo&units=metric&APPID=${api.key}`)
    .then(resultsTokyo => {
      return resultsTokyo.json();
    }).then(displayTokyo);
}

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

function displayResults(weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
