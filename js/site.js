// fetch weather data

const body = document.body;
const circle = document.querySelector('circle');

let lat = 42.3429718;
let long = -71.0557969;
let temp = 65;
let temp_color = 180;
let precip = 100;
let wind = 5;
let wind_speed = 5;
let cloud_count = 0;

const api = `http://api.weatherapi.com/v1/forecast.json?key=5863755acb594078956213139202910&q=${lat},${long}&days=1`;

fetch(api)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const {
      precip_mm,
      temp_f,
      feelslike_f,
      humidity,
      vis_miles,
      wind_mph,
      temp_c,
    } = data.current;
    precip = data.current.precip_mm;
    console.log("Precip: ", precip);
    temp = data.current.temp_f;
    console.log("Temp: ", temp);
    wind = data.current.wind_mph;
    console.log("Wind: ", wind);
    wind_speed = 10 - 5 * (wind / 12.3);
    console.log("wind_speed: ", wind_speed);
    temp_color = remapNumber(temp, 9, 91, 180, 360);
    console.log("temp_color: ", temp_color);

    cloudSVG(10, cloudColor(precip+20));
    cloudSVG(10, cloudColor(precip+10));
    cloudSVG(10, cloudColor(precip));
  });

// draw circle
// function draw() {
//   console.log("draw() called successfully");
//   const color = `hsl(0%, 100%, 50%)`;
//   body.style.setProperty('--circle-fill', color);

//   window.requestAnimationFrame(() => {
//     draw();
//   });
// }

// Generates position of new circle within bounds
function generatePositionValues(pre_pos) {
  console.log("generatePositionValues() called successfully");
  const rad = 50 - 25*Math.random();
  const vector_min = Math.max(rad, pre_pos.rad);
  const vector_max = rad + pre_pos.rad;
  const vector_size = remapNumber(Math.random(), 0, 1, vector_min, vector_max);
  const vector_angle = remapNumber(Math.random(), 0, 1, 0, 360);
  const xpos = 250+Math.sin(vector_angle)*vector_size;
  const ypos = 250+Math.cos(vector_angle)*vector_size;
  console.log("Position values: ", rad, xpos, ypos);
  return {rad, xpos, ypos};
}

// Creates an svg containing n circles
function cloudSVG(num_clouds, precipitation) {

  const canvas = document.getElementById('canvas');
  const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
  let cloud_id = "Cloud ";
  svg.setAttribute("viewBox", "0 0 500 500");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("class", "cloud_svg");
  cloud_id = cloud_id+cloud_count;
  svg.setAttribute("id", cloud_id);
  cloud_count = cloud_count++;
  
  
  canvas.appendChild(svg);

  let position ={rad:50, xpos:500, ypos:500};

  for (i = 0; i < num_clouds; i++){
    position = generatePositionValues(position);
    document.getElementById(cloud_id).innerHTML += createCircle(position, precipitation);
  }
  return svg;
}

// Returns a circle with given position and radius data
function createCircle({rad, xpos, ypos}, precipitation) {
  console.log("createCircle() called successfully");
  return `<circle cx="${xpos}px" cy="${ypos}px" r="${rad}px" fill="${precipitation}"></circle>`;
}

// Sets hsl color for cloud
function cloudColor(precipitation) {
  let c = remapNumber(precipitation, 0, 200, 25, 85);
  let col_val = 110 - c;
  return `hsl(0, 0%, ${col_val}%)`;
}

// Remap a number within two given ranges
function remapNumber(number, in_min, in_max, out_min, out_max) {
  return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}