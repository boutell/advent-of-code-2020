const fs = require('fs');
const data = fs.readFileSync('input5.txt', 'utf8').split('\n').map(line => line.trim()).filter(line => line.length);

let max = 0;
for (const pass of data) {
  const binary = pass.replace(/[BR]/g, '1').replace(/[FL]/g, '0');
  console.log(binary);
  const id = parseInt(binary, 2);
  if (id > max) {
    max = id;
  }
}
console.log(max);
