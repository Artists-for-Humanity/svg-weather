// fetch weather data

const body = document.body;
const circle = document.querySelector('circle');

let lat = 42.3429718;
let long = -71.0557969;
let temp = 65;
let temp_color = 180;
let wind = 5;
let wind_speed = 5;

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

    createSVG();
  });

// draw circle
function draw() {
  console.log("draw() called successfully");
  const color = `hsl(${temp_color}, 100%, 50%)`;
  body.style.setProperty('--circle-fill', color);

  window.requestAnimationFrame(() => {
    draw();
  });
}

function createSVG() {
  console.log("createSVG() called successfully");

  const canvas = document.getElementById('canvas');
  const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
  
  // Set viewport here
  svg.setAttribute("viewBox", "0 0 1000 1000");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  
  canvas.appendChild(svg);

  let position ={rad:50, xpos:500, ypos:500};
  
  position = generatePositionValues(position);
  svg.appendChild(createCircle(position));

  position = generatePositionValues(position);
  svg.appendChild(createCircle(position));

  position = generatePositionValues(position);
  svg.appendChild(createCircle(position));

  position = generatePositionValues(position);
  svg.appendChild(createCircle(position));
}

function generatePositionValues(pre_pos) {
  console.log("generatePositionValues() called successfully");
  const rad = 50 - 25*Math.random();
  const vector_min = Math.max(rad, pre_pos.rad);
  const vector_max = rad + pre_pos.rad;
  const vector_size = remapNumber(Math.random(), 0, 1, vector_min, vector_max);
  const vector_angle = remapNumber(Math.random(), 0, 1, 225, 315);
  const xpos = Math.cos(vector_angle)*vector_size;
  const ypos = Math.sin(vector_angle)*vector_size;
  console.log("Position values: ", rad, xpos, ypos);
  return {rad, xpos, ypos};
}

function createCircle({rad, xpos, ypos}) {
  console.log("createCircle() called successfully");
  const circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
  // Set circle attributes
  circle.setAttribute("cx", xpos);
  circle.setAttribute("cy", ypos);
  circle.setAttribute("r", rad);
  return circle;
}

// Remap a number within two given ranges
function remapNumber(number, in_min, in_max, out_min, out_max) {
  return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}