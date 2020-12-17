const fs = require('fs');

const data = fs.readFileSync('input16.txt', 'utf8');
// const data = `
// class: 1-3 or 5-7
// row: 6-11 or 33-44
// seat: 13-40 or 45-50

// your ticket:
// 7,1,14

// nearby tickets:
// 7,3,47
// 40,4,50
// 55,2,20
// 38,6,12
// `;
const lines = data.split('\n').map(line => line.trim()).filter(line => line.length);
const valid = {};
const tickets = [];

for (const line of lines) {
  let matches = line.match(/^([a-z][a-z ]+): (\d+)-(\d+) or (\d+)-(\d+)/);
  if (matches) {
    let [ , label, low1, high1, low2, high2 ] = matches;
    low1 = parseInt(low1);
    low2 = parseInt(low2);
    high1 = parseInt(high1);
    high2 = parseInt(high2);
    for (let i = low1; (i <= high1); i++) {
      valid[i] = valid[i] || {};
      valid[i][label] = true;
    }
    for (let i = low2; (i <= high2); i++) {
      valid[i] = valid[i] || {};
      valid[i][label] = true;
    }
  }
}
const nearby = lines.findIndex(line => line.match(/^nearby/));
for (let i = nearby + 1; (i < lines.length); i++) {
  if (lines[i].match(/,/)) {
    tickets.push(lines[i].split(',').map(s => parseInt(s)));
  }
}

const validTickets = tickets.filter(ticket => !ticket.find(field => !valid[field]));

const known = {};

// TODO if a field is known for a particular ticket then we can
// remove that field from the list of possibilities for other numbers
// for that particular ticket... winnow it down iteratively

for (const [ number, labels ] of Object.entries(valid)) {
  const keys = Object.keys(labels);
  if (keys.length === 1) {
    if (!known[keys[0]]) {
      known[keys[0]] = true;
    }
  }
}
console.log(known);
