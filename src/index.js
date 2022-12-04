let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hours < 10) {
  hours = `0${hours}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let lineDate = document.querySelector("#currentTime");
lineDate.innerHTML = day + " " + hours + ":" + minutes;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
<div class="col-2">
   <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
   <img src="http://openweathermap.org/img/wn/${
     forecastDay.weather[0].icon
   }@2x.png" alt="weather image" class="icon1"/>
<div class="weather-forecast-temperatures">
  <span class="weather-forecast-temperature-max">${Math.round(
    forecastDay.temp.max
  )}° </span>
  <span class="weather-forecast-temperature-min">- ${Math.round(
    forecastDay.temp.min
  )}°</span>
</div>
</div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let apiKey = "0c82e3d9689abed74d1ce4e8c98ed561";

function getForecast(coordinates) {
  let apiKey = "a969311cfcbb4a83dfad2cf7478397f9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#dataInput").value;

  searchCity(city);

  function searchCity(city) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
  }
  function showTemperature(response) {
    document.querySelector("#currentCity").innerHTML = response.data.name;

    celciusTemperature = response.data.main.temp;
    let temp = celciusTemperature;
    let chosenTemp = document.querySelector("#tempSwitcher");
    chosenTemp.innerHTML = Math.round(temp);

    let weatherDescription = response.data.weather[0].description;
    let chosenDescriontion = document.querySelector("#description");
    chosenDescriontion.innerHTML = weatherDescription;

    let weatherHumidity = response.data.main.humidity;
    let chosenHumidity = document.querySelector("#humidity");
    chosenHumidity.innerHTML = weatherHumidity;

    let windSpeed = response.data.wind.speed;
    let chosenSpeed = document.querySelector("#speed");
    chosenSpeed.innerHTML = Math.round(windSpeed);

    let chosenIcon = document.querySelector("#icon");
    chosenIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    getForecast(response.data.coord);
  }
}

let form = document.querySelector("#citySearch");
form.addEventListener("submit", searchCity);

function searchLocation(position) {
  let apiKey = "0c82e3d9689abed74d1ce4e8c98ed561";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  function showTemperatureCurrent(response) {
    let currentCityName = document.querySelector("#currentCity");
    currentCityName.innerHTML = response.data.name;

    let temp = response.data.main.temp;
    let TempCurrent = document.querySelector("#tempSwitcher");
    TempCurrent.innerHTML = Math.round(temp);

    let weatherDescriptionCurrent = response.data.weather[0].description;
    let chosenDescriontionCurrent = document.querySelector("#description");
    chosenDescriontionCurrent.innerHTML = weatherDescriptionCurrent;

    let weatherHumidityCurrent = response.data.main.humidity;
    let chosenHumidityCurrent = document.querySelector("#humidity");
    chosenHumidityCurrent.innerHTML = weatherHumidityCurrent;

    let windSpeedCurrent = response.data.wind.speed;
    let chosenSpeedCurrent = document.querySelector("#speed");
    chosenSpeedCurrent.innerHTML = Math.round(windSpeedCurrent);
    let chosenIcon = document.querySelector("#icon");
    chosenIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    getForecast(response.data.coord);
  }
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperatureCurrent);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
