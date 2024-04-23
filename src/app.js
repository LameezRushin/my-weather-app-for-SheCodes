function displayTemp(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-app-city");
  let descriptionElement = document.querySelector("#weather-app-description");
  let humidityElement = document.querySelector("#weather-app-humidity");
  let windSpeedElement = document.querySelector("#weather-app-wind-speed");
  let timeElement = document.querySelector("#weather-app-time");
  let date = new Date();
  let iconElement = document.querySelector(".icon");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let hour = date.getHours();
  let minute = date.getMinutes();
  let currentDay = days[date.getDay()];

  if (minute < 10) {
    minute = `0${minute}`;
  }

  if (hour < 10) {
    hour = `0${hour}`;
  }

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = `${currentDay}, ${hour}:${minute}`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" id="weather-app-icon"/>`;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "8019d34f095be575353b45c55a660t0o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="row">
    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(day.time)}</div>
      <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
      <div class="weather-forecast-temperatures">
        <strong>${Math.round(day.temperature.maximum)}°</strong> ${Math.round(
          day.temperature.minimum
        )}°
      </div>
    </div>
  </div>
`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "8019d34f095be575353b45c55a660t0o";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Cape Town");
