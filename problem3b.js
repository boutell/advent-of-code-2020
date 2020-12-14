const fs = require('fs');
const data = fs.readFileSync('input3.txt', 'utf8').split('\n').filter(e => e.length);

let product = 1;
for (const [ right, down] of [
  [ 1, 1 ],
  [ 3, 1 ],
  [ 5, 1 ],
  [ 7, 1 ],
  [ 1, 2 ]
]) {
  product *= slide(right, down);
}

console.log(product);

function slide(right, down) {
  let proof = '';
  let trees = 0;
  let x = 0;
  for (y = 0; (y < data.length); y += down) {
    if (data[y].charAt(x) === '#') {
      trees++;
      proof += data[y].substring(0, x) + 'X' + data[y].substring(x + 1) + '\n';
    } else {
      proof += data[y].substring(0, x) + 'O' + data[y].substring(x + 1) + '\n';
    }
    x += right;
    x %= data[y].length;
  }
  console.log(proof);
  console.log(trees);
  return trees;
}
