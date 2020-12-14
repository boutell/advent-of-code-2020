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
let angle = 0;

for (const line of lines) {
  let [ dummy, command, value ] = line.match(/^([A-Z])(\d+)$/);
  value = parseFloat(value);
  console.log(`>> line: ${command} ${value}`);
  switch (command) {
    case 'N':
      y -= value;
      break;
    case 'E':
      x += value;
      break;
    case 'S':
      y += value;
      break;
    case 'W':
      x -= value;
      break;
    case 'L':
      angle -= value;
      break;
    case 'R':
      angle += value;
      break;
    case 'F':
      // Degrees to radians
      x += Math.cos(angle / 360 * Math.PI * 2) * value;
      y += Math.sin(angle / 360 * Math.PI * 2) * value;
      break;
    default:
      throw `Huh? ${command}`;
  }
  console.log(`${x},${y}`);
}
console.log(Math.abs(x) + Math.abs(y));

