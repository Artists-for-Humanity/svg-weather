// fetch weather data

  let lat;
  let long;

  const api = `http://api.weatherapi.com/v1/forecast.json?key=5863755acb594078956213139202910&q=${lat},${long}&days=1`;

  fetch(api)
    .then((response) => response.json())
    .then((data) => console.log(data));
       

// draw circle
const body = document.body;
const circle = document.querySelector('circle');
body.style.setProperty('--circle-animation-speed', '5s');

draw();

function draw() {
  const time = Math.round((new Date().getTime()) / 20);
  const color = `hsl(${time % 360}deg, 100%, 50%)`;
  body.style.setProperty('--circle-fill', color);

  window.requestAnimationFrame(() => {
    draw();
  });
}