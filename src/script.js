function formatDate(date) {
  let dateNumber = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day}, ${month} ${dateNumber}, ${hours}:${minutes}`;
}
let now = new Date();
let currentTime = document.querySelector("#date-time");
currentTime.innerHTML = formatDate(now);

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

let citySubmitted = document.querySelector("#weather-search");
citySubmitted.addEventListener("submit", submitCity);

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#search-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#windSpeed");
  let iconElement = document.querySelector("#weather-icon");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src", `imgs/${response.data.weather[0].icon}.gif`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
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

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", getCurrentPosition);
