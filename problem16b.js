const fs = require('fs');

const data = fs.readFileSync('input16.txt', 'utf8');
// const data = `
// class: 0-1 or 4-19
// row: 0-5 or 8-19
// seat: 0-13 or 16-19

// your ticket:
// 11,12,13

// nearby tickets:
// 3,9,18
// 15,1,5
// 5,14,9
// `;
const lines = data.split('\n').map(line => line.trim()).filter(line => line.length);
const valid = {};
const tickets = [];
let labels = [];

for (const line of lines) {
  let matches = line.match(/^([a-z][a-z ]+): (\d+)-(\d+) or (\d+)-(\d+)/);
  if (matches) {
    let [ , label, low1, high1, low2, high2 ] = matches;
    labels.push(label);
    low1 = parseInt(low1);
    low2 = parseInt(low2);
    high1 = parseInt(high1);
    high2 = parseInt(high2);
    for (let i = low1; (i <= high1); i++) {
      valid[i] = valid[i] || [];
      if (!valid[i].includes(label)) {
        valid[i].push(label);
      }
    }
    for (let i = low2; (i <= high2); i++) {
      valid[i] = valid[i] || [];
      if (!valid[i].includes(label)) {
        valid[i].push(label);
      }
    }
  }
}

const your = lines.findIndex(line => line.match(/^your/));
const yourTicket = lines[your + 1].split(',').map(s => parseInt(s));

const nearby = lines.findIndex(line => line.match(/^nearby/));
for (let i = nearby + 1; (i < lines.length); i++) {
  if (lines[i].match(/,/)) {
    tickets.push({
      values: lines[i].split(',').map(s => parseInt(s)),
      fields: {}
    });
  }
}

const validTickets = tickets.filter(ticket => !ticket.values.find(value => !valid[value]));

const positions = [];

for (let position = 0; (position < labels.length); position++) {
  for (const label of labels) {
    let bad = false;
    for (const ticket of validTickets) {
      if (!valid[ticket.values[position]].includes(label)) {
        bad = true;
        break;
      }
    }
    if (!bad) {
      positions[position] = positions[position] || [];
      positions[position].push(label);
    }
  }
}

while (true) {
  const known = {};
  for (const [ position, value ] of Object.entries(positions)) {
    if (value.length === 1) {
      known[position] = value[0];
    }
  }
  for (const [ position, value ] of Object.entries(positions)) {
    for (const label of Object.values(known)) {
      if (value.length > 1 && value.includes(label)) {
        positions[position] = value.filter(_label => label !== _label);
      }
    }
  }
  if (Object.keys(known).length === positions.length) {
    break;
  }
}

let product = 1;
for (const [ position, value ] of Object.entries(positions)) {
  console.log(`${value[0]}: ${yourTicket[position]}`);
  if (value[0].startsWith('departure')) {
    product *= yourTicket[position];
  }
}
console.log(product);
