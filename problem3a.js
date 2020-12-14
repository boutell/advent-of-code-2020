const fs = require('fs');
const data = fs.readFileSync('input3.txt', 'utf8').split('\n').filter(e => e.length);

let proof = '';
let trees = 0;
let x = 0;
for (y = 0; (y < data.length); y++) {
  if (data[y].charAt(x) === '#') {
    trees++;
    proof += data[y].substring(0, x) + 'X' + data[y].substring(x + 1) + '\n';
  } else {
    proof += data[y].substring(0, x) + 'O' + data[y].substring(x + 1) + '\n';
  }
  x += 3;
  x %= data[y].length;
}
console.log(proof);
console.log(trees);
