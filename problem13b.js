const fs = require('fs');

// const data = fs.readFileSync('input13.txt', 'utf8');
const data = `939
7,13,x,x,59,x,31,19`;

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
let now = 0;
let max = 0;
console.log(pairs);
while (true) {
  let i;
  for (i = 0; (i < pairs.length); i++) {
    if ((now + pairs[i][0]) % pairs[i][1]) {
      break;
    }
    if ((max === undefined) || (i > max)) {
      max = i;
      console.log(`${max} (${pairs[i][1]}) @${now}`);
    }
  }
  if (i === pairs.length) {
    console.log(now);
    break;
  }
  now++;
}
