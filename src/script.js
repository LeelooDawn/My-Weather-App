function formatDate(date) {
  let dateNumber = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? `pm` : `am`;
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? `0` + minutes : minutes;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  return `It is ${day}, ${month} ${dateNumber} ${hours}:${minutes} ${ampm}`;
}
let now = new Date();
let currentTime = document.querySelector("#date-time");
currentTime.innerHTML = formatDate(now);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function submitCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#weather-input");
  let yourCity = document.querySelector("#search-city");
  yourCity.innerHTML = cityInput.value;
  getTemperature(cityInput.value);
}

function getTemperature(citySubmitted) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySubmitted}&units=imperial&appid=ff39e85e3d2df1fdfa77a8da0f6b888f`;
  axios.get(apiUrl).then(displayTemperature);
}
function getForecast(coordinates) {
  let apiKey = "ff39e85e3d2df1fdfa77a8da0f6b888f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#search-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#windSpeed");
  let iconElement = document.querySelector("#weather-icon");
  fahrenheitTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src", `imgs/${response.data.weather[0].icon}.gif`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = `ff39e85e3d2df1fdfa77a8da0f6b888f`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayTemperature);
  });
}

function displayForecast(response) {
  let dailyForecast = response.data.daily;
  forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
                <img class="animated-gif" src="imgs/${
                  forecastDay.weather[0].icon
                }.gif" alt="clear" />
                <div class="forecast-temp">${Math.round(
                  forecastDay.temp.max
                )}</div>
                <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let citySubmitted = document.querySelector("#weather-search");
citySubmitted.addEventListener("submit", submitCity);

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", getCurrentPosition);

getTemperature("Bernalillo");
