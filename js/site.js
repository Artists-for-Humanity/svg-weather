// fetch weather data

var lat = 42.3429718;
var long = -71.0557969;
var temp = 65;
var temp_color = 180;

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

    const { name } = data.location;

    const { text, icon } = data.current.condition;

    const {
      maxtemp_f,
      mintemp_f,
      maxtemp_c,
      mintemp_c,
    } = data.forecast.forecastday[0].day;

    const hour_0_temp_f = data.forecast.forecastday[0].hour[0].temp_f;

    const hour_1_temp_f = data.forecast.forecastday[0].hour[1].temp_f;

    temp = data.current.temp_f;
    console.log("Temp: ", temp);

    temp_color = remapNumber(temp, 9, 91, 180, 360);
    console.log("temp_color: ", temp_color);
    draw();
  });



// draw circle
const body = document.body;
const circle = document.querySelector('circle');
body.style.setProperty('--circle-animation-speed', '5s');



function draw() {
  const color = `hsl(${temp_color}, 100%, 50%)`;
  body.style.setProperty('--circle-fill', color);

  window.requestAnimationFrame(() => {
    draw();
  });
}

function remapNumber(number, in_min, in_max, out_min, out_max) {
  return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}