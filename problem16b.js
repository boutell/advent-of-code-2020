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

let changed;
let passes = 0;
do {
  changed = false;
  passes++;
  let min = 0;
  for (const ticket of validTickets) {
    if (Object.keys(ticket.fields).length === labels.length) {
      continue;
    }
    const newValues = [];
    for (const value of ticket.values) {
      console.log(value, valid[value]);
      if (valid[value].length < 19) {
        console.log('WOW');
      }
      const possibleFields = valid[value].filter(label => !ticket.fields[label]);
      // console.log(value, possibleFields);
      // console.log(value);
      if ((!min) || (possibleFields.length < min)) {
        min = possibleFields.length;
      }
      if (possibleFields.length === 1) {
        console.log('BOOM');
        ticket.fields[valid[value]] = value;
        changed = true;
      } else {
        newValues.push(value);
      }
    }
    ticket.values = newValues;
  }
  console.log(min);
} while (changed);
console.log(passes);
// console.log(validTickets);
