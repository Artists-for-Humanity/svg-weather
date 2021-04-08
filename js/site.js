// fetch weather data

const body = document.body;
const circle = document.querySelector('circle');

var lat = 42.3429718;
var long = -71.0557969;
var temp = 65;
var temp_color = 180;
var wind = 5;
var wind_speed = 5;

const api = `http://api.weatherapi.com/v1/forecast.json?key=5863755acb594078956213139202910&q=${lat},${long}&days=1`;

fetch(api)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const {
      temp_f,
      feelslike_f,
      humidity,
      vis_miles,
      wind_mph,
      temp_c,
    } = data.current;

    temp = data.current.temp_f;
    console.log("Temp: ", temp);
    wind = data.current.wind_mph;
    console.log("Wind: ", wind);
    wind_speed = 10 - 5 * (wind / 12.3);
    console.log("wind_speed: ", wind_speed);
    temp_color = remapNumber(temp, 9, 91, 180, 360);
    console.log("temp_color: ", temp_color);

    body.style.setProperty('--circle-animation-speed', `${wind_speed}s`);

    draw();
  });

// draw circle
function draw() {
  const color = `hsl(${temp_color}, 100%, 50%)`;
  body.style.setProperty('--circle-fill', color);

  window.requestAnimationFrame(() => {
    draw();
  });
}

// Remap a number within two given ranges
function remapNumber(number, in_min, in_max, out_min, out_max) {
  return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}