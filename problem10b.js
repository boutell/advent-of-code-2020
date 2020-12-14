const fs = require('fs');

const adapters = [ 0, ...fs.readFileSync('input10.txt', 'utf8').split('\n').map(line => line.trim()).filter(line => line.length).map(s => parseInt(s)) ];

adapters.sort((a, b) => {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
});
adapters.push(adapters[adapters.length - 1] + 3);

const cache = {};
console.log(count(0));

function count(from) {
  if (cache[from] !== undefined) {
    return cache[from];
  }
  if (from === adapters.length - 1) {
    cache[from] = 1;
    return cache[from];
  }
  let sum = 0;
  for (let i = 1; (i <= 3); i++) {
    if (adapters[from + i] - adapters[from] <= 3) {
      sum += count(from + i);
    }
  }
  cache[from] = sum;
  return cache[from];
}
