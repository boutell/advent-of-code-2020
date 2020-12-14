const fs = require('fs');

const data = fs.readFileSync('input13.txt', 'utf8');
// const data = `939
// 7,13,x,x,59,x,31,19`;

const lines = data.split('\n').map(line => line.trim()).filter(line => line.length);

const start = parseInt(lines[0]);
const ids = lines[1].split(',').filter(id => parseInt(id)).map(id => parseInt(id));

let now = start;
console.log(start, ids);
outer: while (true) {
  for (const id of ids) {
    if (!(now % id)) {
      console.log(`${id} x ${now - start} = ${id * (now - start)}`);
      break outer;
    }
  }
  now++;
}
