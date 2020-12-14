const fs = require('fs');

const data = fs.readFileSync('input12.txt', 'utf8');
// const data = `F10
// N3
// F7
// R90
// F11`;

const lines = data.split('\n').map(line => line.trim()).filter(line => line.length);

let x = 0;
let y = 0;
let wx = 10;
let wy = -1;
let angle;

updateAngle();
for (const line of lines) {
  let [ dummy, command, value ] = line.match(/^([A-Z])(\d+)$/);
  value = parseFloat(value);
  console.log(`>> line: ${command} ${value}`);
  switch (command) {
    case 'N':
      wy -= value;
      break;
    case 'E':
      wx += value;
      break;
    case 'S':
      wy += value;
      break;
    case 'W':
      wx -= value;
      break;
    case 'L':
      turn(-value);
      break;
    case 'R':
      turn(value);
      break;
    case 'F':
      const xd = wx - x;
      const yd = wy - y;
      x += xd * value;
      y += yd * value;
      wx = x + xd;  
      wy = y + yd;  
      break;
    default:
      throw `Huh? ${command}`;
  }
  updateAngle();
  console.log(`${x},${y},${wx},${wy},${angle}`);
}
console.log(Math.abs(x) + Math.abs(y));

function turn(value) {
  const distance = Math.sqrt((wy - y) * (wy - y) + (wx - x) * (wx - x));
  angle += value;
  // Relative to the ship
  wx = x + Math.cos(angle / 360 * Math.PI * 2) * distance;
  wy = y + Math.sin(angle / 360 * Math.PI * 2) * distance;
  updateAngle();
}

function updateAngle() {
  angle = Math.atan2(wy - y, wx - x) * 360 / (Math.PI * 2);
  // ((wx - x) / (wy - y)) * 360 / (Math.PI * 2);
  // if (wy === y) {
  //   if (wx < x) {
  //     angle = -90;
  //   } else if (wx > x) {
  //     angle = 90;
  //   } else {
  //     // In same spot, maintain previous heading
  //   }
  // } else {
  //   angle = Math.atan2(wx - x, wy - y); // ((wx - x) / (wy - y)) * 360 / (Math.PI * 2);
  //   // I have a quadrant problem. I can't tell the difference
  //   // between both differences being negative and both differences
  //   // being positive. There is probably a better solution to this
  //   // whole problem with matrices or something.
  //   
  // }
}

