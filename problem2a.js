const fs = require('fs');
let valid = 0;
let invalid = 0;
const data = fs.readFileSync('input2.txt', 'utf8').split('\n').filter(e => e.length);
for (const datum of data) {
  console.log('>>' + datum);
  const matches = datum.match(/^(\d+)-(\d+) ([a-z]): ([a-z]+)/);
  const [ dummy, min, max, char, password ] = matches;
  const chars = password.split('');
  let total = 0;
  for (const c of chars) {
    if (c === char) {
      total++;
    }
  }
  if ((total >= min) && (total <= max)) {
    valid++;
    console.log(datum);
  } else {
    invalid++;
  }
}
console.log(valid);
console.log('invalid: ' + invalid);
