const fs = require('fs');
const data = fs.readFileSync('input6.txt', 'utf8').split('\n').map(line => line.trim());
let groups = [];
let group = {};

for (const row of data) {
  if (!row.length) {
    groups.push(group);
    group = {};
    continue;
  }
  const answers = row.split('');

  for (answer of answers) {
    group[answer] = true;
  }
}
if (Object.keys(group).length) {
  groups.push(group);
}

let sum = 0;
for (const group of groups) {
  sum += Object.keys(group).length;
}

console.log(sum);
