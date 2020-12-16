const fs = require('fs');

const data = fs.readFileSync('input13.txt', 'utf8');
// const data = `939
// 7,13,x,x,59,x,31,19`;

const lines = data.split('\n').map(line => line.trim()).filter(line => line.length);

// const start = parseInt(lines[0]);
const ids = lines[1].split(',').map(id => (id === 'x') ? 'x' : parseInt(id));
const pairs = [];
for (let i = 0; (i < ids.length); i++) {
  if (ids[i] === 'x') {
    continue;
  }
  pairs.push([
    i,
    ids[i]
  ]);
}
pairs.sort((a, b) => {
  if (a[1] > b[1]) {
    return -1;
  } else if (a[1] < b[1]) {
    return 1;
  } else {
    return 0;
  }
});
let zeroTime = pairs[0][1];
let max = 0;
let broken = 0;
let increment = pairs[0][1];
console.log(pairs);
while (true) {
  // console.log(zeroTime);
  const now = zeroTime - pairs[0][0];
  let i;
  for (i = max + 1; (i < pairs.length); i++) {
    if ((now + pairs[i][0]) % pairs[i][1]) {
      break;
    }
    if (i > max) {
      max = i;
      increment *= pairs[i][1];
      console.log(`${max} (${pairs[i][1]}) @${now}`);
    }
  }
  if (i === pairs.length) {
    console.log(now);
    break;
  }
  zeroTime += increment;
}
