// fetch weather data

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