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

function displayForecast(response) {
  console.log(response.data);

  let days = ["Fri", "Sat", "Sun", "Mon", "Tue"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
  <div class="row">
    <div class="col-2">
      <div class="weather-forecast-date">${day}</div>
      <div class="weather-forecast-icon">🌧</div>
      <div class="weather-forecast-temperatures">
        <strong>18°</strong> 12°C
      </div>
    </div>
  </div>
`;
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
