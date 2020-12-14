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
const nonSum = bad[0];

let done = false;
for (let i = 0; (i < xmas.length); i++) {
  let sum = 0;
  let n = 0;
  for (let j = i; (j < xmas.length); j++) {
    sum += xmas[j];
    n++;
    if ((n > 1) && (sum === nonSum)) {
      let min, max;
      for (let k = i; (k < j); k++) {
        if ((min === undefined) || (min > xmas[k])) {
          min = xmas[k];
        }
        if ((max === undefined) || (max < xmas[k])) {
          max = xmas[k];
        }
      }
      console.log(min + max);
      done = true;
      break;
    }
  }
  if (done) {
    break;
  }
}