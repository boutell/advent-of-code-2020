const fs = require('fs');
const data = fs.readFileSync('input5.txt', 'utf8').split('\n').map(line => line.trim()).filter(line => line.length);

let max = 0;
let ids = [];
for (const pass of data) {
  const binary = pass.replace(/[BR]/g, '1').replace(/[FL]/g, '0');
  const id = parseInt(binary, 2);
  ids[id] = true;
  if (id > max) {
    max = id;
  }
}
for (i = 1; (i < max); i++) {
  if (!ids[i] && ids[i - 1] && ids[i + 1]) {
    console.log(i);
  }
}
