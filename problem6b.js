const fs = require('fs');
const data = fs.readFileSync('input6.txt', 'utf8').split('\n').map(line => line.trim());
let groups = [];
let group = {
  size: 0,
  answers: {}
};

for (const row of data) {
  if (!row.length) {
    groups.push(group);
    group = {
      size: 0,
      answers: {}
    };
    continue;
  }
  const answers = row.split('');
  group.size++;
  for (answer of answers) {
    group.answers[answer] = group.answers[answer] || 0;
    group.answers[answer]++;
  }
}
if (Object.keys(group).length) {
  groups.push(group);
}

let sum = 0;
for (const group of groups) {
  sum += Object.keys(group.answers).filter(key => group.answers[key] === group.size).length;
}

console.log(sum);
