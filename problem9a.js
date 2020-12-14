const fs = require('fs');
const xmas = fs.readFileSync('input9.txt', 'utf8').split('\n').map(line => line.trim()).filter(line => line.length).map(s => parseInt(s));
const bad = [];
let count = 0;
for (let i = 25; (i < xmas.length); i++) {
  let good = false;
  for (let j = i - 25; (j < i); j++) {
    for (let k = j + 1; (k < i); k++) {
      if (xmas[j] + xmas[k] === xmas[i]) {
        good = true;
        break;
      }
    }
    if (good) {
      break;
    }
  }
  if (!good) {
    bad.push(xmas[i]);
  }
}
console.log(bad[0]);
