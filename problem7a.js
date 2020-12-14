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
    rules[parent].push({ color, n });
  });
});
console.log(rules);

const eventually = {};
findContainers('shiny gold');
console.log(Object.keys(eventually).length);

function findContainers(color) {
  Object.keys(rules).forEach(parent => {
    if (rules[parent].find(rule => rule.color === color)) {
      if (!eventually[parent]) {
        eventually[parent] = true;
        findContainers(parent);
      }
    }
  });
}
