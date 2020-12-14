const fs = require('fs');
const data = fs.readFileSync('input7.txt', 'utf8').split('\n').map(line => line.trim().replace(/ bags?\.?/g, '')).filter(line => line.length);

const rules = {};
data.forEach(datum => {
  const [ dummy, parent, contentsString ] = datum.match(/^([\w\s]+)?\scontain\s(.*)$/);
  const contentsStrings = contentsString.split(', ');
  rules[parent] = [];
  contentsStrings.forEach(contentString => {
    if (contentString === 'no other') {
      return;
    }
    const [ dummy, n, color ] = contentString.match(/^(\d+) (.*)?\s*$/);
    rules[parent].push({ color, n: parseInt(n) });
  });
});
console.log(rules);

console.log(countBags('shiny gold'));

function countBags(color) {
  const list = rules[color];
  let sum = 0;
  for (const item of list) {
    sum += item.n;
    sum += item.n * countBags(item.color);
  }
  return sum;
}
