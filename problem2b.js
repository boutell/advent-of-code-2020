const fs = require('fs');
let valid = 0;
let invalid = 0;
const data = fs.readFileSync('input2.txt', 'utf8').split('\n').filter(e => e.length);
for (const datum of data) {
  console.log('>>' + datum);
  const matches = datum.match(/^(\d+)-(\d+) ([a-z]): ([a-z]+)/);
  let [ dummy, first, second, char, password ] = matches;
  first = parseInt(first);
  second = parseInt(second);
  const chars = password.split('');
  first = chars[first - 1] === char;
  second = chars[second - 1] === char;
  if ((first && !second) || (second && !first)) {
    valid++;
    console.log(datum);
  } else {
    invalid++;
  }
}
console.log(valid);
console.log('invalid: ' + invalid);
